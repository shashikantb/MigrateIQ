"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Terminal } from "lucide-react"
import { useState, useRef, useEffect, type KeyboardEvent } from "react"

interface Message {
  type: "command" | "response"
  text: string
}

const commandResponses: { [key: string]: string } = {
  "status appX": "appX: Status - In Progress. 75% complete. Current step: Deploying database.",
  "status appY": "appY: Status - Completed. Migration finished successfully.",
  "suggest fix appX": "Suggestion: The 'auth-service' connection is timing out. Consider increasing the timeout or checking firewall rules.",
  "suggest fix appY": "No issues detected for appY.",
  "help": "Available commands: /MigrateQ status <app_name>, /MigrateQ suggest fix <app_name>"
};

export default function ChatOpsPage() {
  const [messages, setMessages] = useState<Message[]>([
    { type: "response", text: "Welcome to MigrateQ ChatOps. Type `/MigrateQ help` for commands." },
  ])
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleCommand = (command: string) => {
    const newMessages: Message[] = [...messages, { type: "command", text: command }]
    
    const normalizedCommand = command.replace(/^\/MigrateQ\s+/, '').trim();
    const response = commandResponses[normalizedCommand] || `Error: Command not found '${normalizedCommand}'. Type '/MigrateQ help'.`

    newMessages.push({ type: "response", text: response })
    setMessages(newMessages)
    setInput("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      handleCommand(input)
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  return (
    <Card className="h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Terminal />
          ChatOps Interface
        </CardTitle>
        <CardDescription>
          Interact with your migration process using CLI commands.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 rounded-md bg-muted/30 p-4 font-mono text-sm">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg.type === "command" ? (
                <div className="flex items-center">
                  <span className="text-primary mr-2">&gt;</span>
                  <span>{msg.text}</span>
                </div>
              ) : (
                <p className="text-muted-foreground whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 flex items-center gap-2">
          <span className="font-mono text-primary">$</span>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command... e.g., /MigrateQ status appX"
            className="font-mono"
          />
        </div>
      </CardContent>
    </Card>
  )
}
