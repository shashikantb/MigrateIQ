"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { db } from "@/lib/firebase"
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Play, RotateCcw, View, PlusCircle } from "lucide-react"

type Project = {
  id: string;
  projectName: string;
  status: "Completed" | "In Progress" | "Failed" | "Pending";
  ownerName: string; // For display, can be user's email or a name field
  target: string;
  org: string;
  // riskScore can be added later
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "default"
    case "In Progress":
      return "secondary"
    case "Failed":
      return "destructive"
    case "Pending":
      return "outline"
    default:
      return "default"
  }
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [projectName, setProjectName] = useState("")
  const [targetCloud, setTargetCloud] = useState("GCP")
  const [orgName, setOrgName] = useState("")
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "projects"), where("owner", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const projectsData: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          projectsData.push({
            id: doc.id,
            projectName: data.projectName,
            status: data.status,
            ownerName: user.email || "Unknown",
            target: data.target,
            org: data.org,
          });
        });
        setProjects(projectsData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleCreateProject = async () => {
    if (!projectName || !targetCloud || !orgName) {
        setFormError("All fields are required.");
        return;
    }
    if (!user) {
        setFormError("You must be logged in to create a project.");
        return;
    }
    
    setFormError("");

    try {
        await addDoc(collection(db, "projects"), {
            projectName: projectName,
            target: targetCloud,
            org: orgName,
            owner: user.uid,
            status: "Pending",
            createdAt: new Date(),
        });
        // Reset form and close dialog
        setProjectName("");
        setTargetCloud("GCP");
        setOrgName("");
        setIsDialogOpen(false);
    } catch (error) {
        console.error("Error creating project:", error);
        setFormError("Failed to create project. Please try again.");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-headline">Migration Dashboard</CardTitle>
            <CardDescription>
              Overview of all ongoing and completed application migrations.
            </CardDescription>
          </div>
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Start Migration
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Create New Migration Project</DialogTitle>
                <DialogDescription>
                    Fill in the details below to start a new migration plan.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="project-name" className="text-right">
                        Project Name
                        </Label>
                        <Input id="project-name" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="target-cloud" className="text-right">
                        Target Cloud
                        </Label>
                        <Select value={targetCloud} onValueChange={setTargetCloud}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a cloud" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GCP">Google Cloud Platform</SelectItem>
                                <SelectItem value="AWS">Amazon Web Services</SelectItem>
                                <SelectItem value="Azure">Microsoft Azure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="org-name" className="text-right">
                        Org / Team
                        </Label>
                        <Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} className="col-span-3" />
                    </div>
                    {formError && <p className="text-center text-sm text-destructive">{formError}</p>}
                </div>
                <DialogFooter>
                <Button type="submit" onClick={handleCreateProject}>Create Project</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>App Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Target Platform</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Loading projects...</TableCell>
                </TableRow>
              ) : projects.length > 0 ? (
                 projects.map((project) => (
                    <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(project.status) as any}>{project.status}</Badge>
                    </TableCell>
                    <TableCell>{project.ownerName}</TableCell>
                    <TableCell>{project.target}</TableCell>
                    <TableCell>{project.org}</TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                            <View className="mr-2 h-4 w-4" />
                            View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Retry
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Rollback
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                 <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">No projects found. Start a new migration.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
