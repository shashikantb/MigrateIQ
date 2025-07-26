"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RotateCcw } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const logLevels = ["INFO", "WARN", "ERROR", "DEBUG"]
const logMessages = [
  "Initializing migration agent...",
  "Scanning source environment...",
  "Found 3 services, 1 database.",
  "Generating migration blueprint for GCP.",
  "Provisioning VPC network...",
  "Creating Cloud SQL instance...",
  "Database connection successful.",
  "Deploying application to Cloud Run...",
  "Deployment failed: memory limit exceeded.",
  "Retrying deployment with increased memory...",
  "Deployment successful.",
  "Running health checks...",
  "All systems operational.",
]

export default function MonitoringPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [health, setHealth] = useState({ cpu: 10, memory: 25, network: 5 })
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const logInterval = setInterval(() => {
      const level = logLevels[Math.floor(Math.random() * logLevels.length)]
      const message = logMessages[Math.floor(Math.random() * logMessages.length)]
      const timestamp = new Date().toISOString()
      setLogs(prevLogs => [...prevLogs, `[${timestamp}] [${level}] - ${message}`])
    }, 2000)

    const healthInterval = setInterval(() => {
      setHealth({
        cpu: Math.floor(Math.random() * 80) + 10,
        memory: Math.floor(Math.random() * 70) + 20,
        network: Math.floor(Math.random() * 90) + 5,
      })
    }, 3000)
    
    return () => {
      clearInterval(logInterval)
      clearInterval(healthInterval)
    }
  }, [])
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [logs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Logs & Monitoring</h1>
        <Button variant="destructive">
          <RotateCcw className="mr-2 h-4 w-4" />
          Initiate Rollback
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>CPU Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={health.cpu} />
            <p className="mt-2 text-right text-muted-foreground">{health.cpu}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Memory Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={health.memory} />
            <p className="mt-2 text-right text-muted-foreground">{health.memory}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Network I/O</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={health.network} />
             <p className="mt-2 text-right text-muted-foreground">{health.network} Mbps</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Log Stream</CardTitle>
          <CardDescription>Live output from the migration agent.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea ref={scrollAreaRef} className="h-96 w-full rounded-md border bg-muted/20">
            <div className="p-4 font-mono text-sm">
              {logs.map((log, index) => (
                <div key={index} className="whitespace-pre-wrap">
                  {log.includes("ERROR") ? (
                     <span className="text-destructive">{log}</span>
                  ) : log.includes("WARN") ? (
                      <span className="text-yellow-500">{log}</span>
                  ) : (
                     <span className="text-muted-foreground">{log}</span>
                  )}
                 
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
