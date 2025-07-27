"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Copy, Terminal, ToyBrick } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

type Project = {
  id: string;
  projectName: string;
  status: "Completed" | "In Progress" | "Failed" | "Pending";
  target: string;
  org: string;
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Completed": return "default"
    case "In Progress": return "secondary"
    case "Failed": return "destructive"
    case "Pending": return "outline"
    default: return "default"
  }
}

const CodeBlock = ({ command }: { command: string }) => {
    const { toast } = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        toast({ title: "Copied to clipboard!" });
    }
    return (
        <div className="relative rounded-md bg-muted/50 p-4 font-mono text-sm">
            <pre className="whitespace-pre-wrap break-all">{command}</pre>
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (projectId) {
      const docRef = doc(db, 'projects', projectId)
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setProject({ id: doc.id, ...doc.data() } as Project)
        } else {
          setError('Project not found.')
        }
        setLoading(false)
      })
      return () => unsubscribe()
    }
  }, [projectId])

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading project...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-destructive">{error}</div>
  }

  if (!project) {
    return null;
  }

  const apiToken = `mig-token-${projectId.substring(0, 8)}...`;
  const cliCommand = `pip install migrateiq-agent\n\nmigrateiq-agent init --token ${apiToken}`;
  const dockerCommand = `docker run -it migrateiq/agent \\\n  --token ${apiToken} \\\n  --project-id ${project.id}`;


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline text-2xl">{project.projectName}</CardTitle>
              <CardDescription>
                Migrating to {project.target} for {project.org}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant={getStatusVariant(project.status) as any}>{project.status}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Terminal />
                Connect Your Infrastructure
            </CardTitle>
            <CardDescription>
                Run the discovery agent on your source server to scan and link your infrastructure.
            </CardDescription>
          </Header>
          <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><Code /> Option A: Install Agent CLI</h3>
                <p className="text-sm text-muted-foreground">
                    Install the agent using pip and initialize it with your project's unique API token.
                </p>
                <CodeBlock command={cliCommand}/>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2"><ToyBrick /> Option B: Run Docker Agent</h3>
                 <p className="text-sm text-muted-foreground">
                    If you have Docker installed, you can run the agent in a container.
                </p>
                <CodeBlock command={dockerCommand} />
              </div>
          </CardContent>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">
                Once the agent sends its discovery payload, your components will appear in the 
                <Link href="/visualizer" className="text-primary hover:underline"> Dependency Visualizer</Link> and a migration plan will be generated in the 
                <Link href="/designer" className="text-primary hover:underline"> Blueprint Designer</Link>.
            </p>
        </CardContent>
       </Card>
    </div>
  )
}
