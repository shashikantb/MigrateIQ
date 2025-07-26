"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { getMigrationBlueprint, getMigrationFixes } from "./actions"
import { Loader2, Wand2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import type { GenerateMigrationBlueprintOutput } from "@/ai/flows/generate-migration-blueprint"
import type { SuggestMigrationFixesOutput } from "@/ai/flows/suggest-migration-fixes"

const blueprintSchema = z.object({
  infrastructureScan: z.string().min(10, "Please provide a valid JSON for infrastructure scan."),
})
type BlueprintFormValues = z.infer<typeof blueprintSchema>

const fixesSchema = z.object({
  blueprint: z.string().min(10, "Please provide a valid blueprint description."),
})
type FixesFormValues = z.infer<typeof fixesSchema>

const exampleInfraScan = {
  apps: [{ name: "CRM", language: "Node.js", db: "MongoDB" }],
  env: "Ubuntu 20.04",
  services: ["nginx", "redis", "express"],
}

export function RecommendationClient() {
  const { toast } = useToast()
  const [isBlueprintLoading, setIsBlueprintLoading] = useState(false)
  const [isFixesLoading, setIsFixesLoading] = useState(false)
  const [blueprintResult, setBlueprintResult] = useState<GenerateMigrationBlueprintOutput | null>(null)
  const [fixesResult, setFixesResult] = useState<SuggestMigrationFixesOutput | null>(null)

  const blueprintForm = useForm<BlueprintFormValues>({
    resolver: zodResolver(blueprintSchema),
    defaultValues: { infrastructureScan: JSON.stringify(exampleInfraScan, null, 2) },
  })

  const fixesForm = useForm<FixesFormValues>({
    resolver: zodResolver(fixesSchema),
    defaultValues: { blueprint: "Our app uses a deprecated library 'request' and connects to a /v1 API endpoint that will be sunset." },
  })

  const onBlueprintSubmit: SubmitHandler<BlueprintFormValues> = async (data) => {
    setIsBlueprintLoading(true)
    setBlueprintResult(null)
    try {
      const parsedInput = JSON.parse(data.infrastructureScan)
      const result = await getMigrationBlueprint({ infrastructureScan: parsedInput })
      if (result.success) {
        setBlueprintResult(result.data!)
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error })
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Invalid JSON", description: "Please check the format of your infrastructure scan." })
    }
    setIsBlueprintLoading(false)
  }

  const onFixesSubmit: SubmitHandler<FixesFormValues> = async (data) => {
    setIsFixesLoading(true)
    setFixesResult(null)
    const result = await getMigrationFixes({ blueprint: data.blueprint })
    if (result.success) {
      setFixesResult(result.data!)
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error })
    }
    setIsFixesLoading(false)
  }

  return (
    <Tabs defaultValue="blueprint">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="blueprint">Generate Blueprint</TabsTrigger>
        <TabsTrigger value="fixes">Suggest Fixes</TabsTrigger>
      </TabsList>
      <TabsContent value="blueprint" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form {...blueprintForm}>
            <form onSubmit={blueprintForm.handleSubmit(onBlueprintSubmit)} className="space-y-4">
              <FormField
                control={blueprintForm.control}
                name="infrastructureScan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Infrastructure Scan (JSON)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={12} placeholder="Enter infrastructure scan JSON..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isBlueprintLoading}>
                {isBlueprintLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Blueprint
              </Button>
            </form>
          </Form>
          <div className="rounded-lg border bg-muted/30 p-4 h-full">
            <h3 className="text-lg font-semibold mb-2 font-headline">Generated Blueprint</h3>
            {isBlueprintLoading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : blueprintResult ? (
              <pre className="text-sm whitespace-pre-wrap break-words">{JSON.stringify(blueprintResult, null, 2)}</pre>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Your generated GCP blueprint will appear here.
              </div>
            )}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="fixes" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form {...fixesForm}>
            <form onSubmit={fixesForm.handleSubmit(onFixesSubmit)} className="space-y-4">
              <FormField
                control={fixesForm.control}
                name="blueprint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blueprint Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={12} placeholder="Describe your application blueprint or migration issues..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isFixesLoading}>
                {isFixesLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Suggest Fixes
              </Button>
            </form>
          </Form>
          <div className="rounded-lg border bg-muted/30 p-4 h-full">
            <h3 className="text-lg font-semibold mb-2 font-headline">AI Suggestions</h3>
            {isFixesLoading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : fixesResult ? (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="fixes">
                  <AccordionTrigger>Suggested Automated Fixes</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {fixesResult.fixes.map((fix, i) => <li key={i}>{fix}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="log">
                  <AccordionTrigger>Detection Log</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">{fixesResult.log}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Suggested fixes and logs will appear here.
              </div>
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
