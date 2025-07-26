import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Play, RotateCcw, View } from "lucide-react"

const projects = [
  {
    appName: "CRM Backend",
    status: "Completed",
    owner: "Alice Johnson",
    targetPlatform: "GCP Cloud Run",
    riskScore: 12,
  },
  {
    appName: "Data Warehouse",
    status: "In Progress",
    owner: "Bob Williams",
    targetPlatform: "BigQuery",
    riskScore: 45,
  },
  {
    appName: "E-commerce Frontend",
    status: "Failed",
    owner: "Charlie Brown",
    targetPlatform: "Firebase Hosting",
    riskScore: 88,
  },
  {
    appName: "Auth Service",
    status: "Pending",
    owner: "Diana Prince",
    targetPlatform: "Cloud Functions",
    riskScore: 23,
  },
  {
    appName: "Billing API",
    status: "Completed",
    owner: "Eve Adams",
    targetPlatform: "GKE",
    riskScore: 5,
  },
]

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
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Migration Dashboard</CardTitle>
          <CardDescription>
            Overview of all ongoing and completed application migrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>App Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Target Platform</TableHead>
                <TableHead className="text-right">Risk Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.appName}>
                  <TableCell className="font-medium">{project.appName}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(project.status) as any}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>{project.owner}</TableCell>
                  <TableCell>{project.targetPlatform}</TableCell>
                  <TableCell className="text-right">{project.riskScore}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
