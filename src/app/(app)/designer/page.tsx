"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Cog, Database, Server, Settings, UploadCloud } from "lucide-react"
import { useState, useEffect } from "react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot, doc, setDoc, addDoc } from "firebase/firestore"

const resources = [
  { name: "Compute", icon: Server },
  { name: "Database", icon: Database },
  { name: "Storage", icon: UploadCloud },
  { name: "Config", icon: Settings },
]

type ComponentProperties = {
  instanceSize: string;
  region: string;
  version?: string;
}

type Component = {
  id: string
  name: string
  type: string
  properties: ComponentProperties
}

export default function DesignerPage() {
  const [components, setComponents] = useState<Component[]>([])
  const [selected, setSelected] = useState<Component | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "components"), (snapshot) => {
      const componentsData: Component[] = []
      snapshot.forEach((doc) => {
        componentsData.push({ id: doc.id, ...doc.data() } as Component)
      });
      setComponents(componentsData);
      if (componentsData.length > 0 && !selected) {
        setSelected(componentsData[0]);
      }
    });

    return () => unsubscribe();
  }, [selected]);
  
  const handlePropertyChange = (prop: keyof ComponentProperties, value: string) => {
      if (selected) {
          const newSelected = {
              ...selected,
              properties: {
                  ...selected.properties,
                  [prop]: value
              }
          };
          setSelected(newSelected);
          
          const docRef = doc(db, "components", selected.id);
          setDoc(docRef, newSelected, { merge: true });
      }
  }

  return (
    <div className="grid h-full min-h-[calc(100vh-8rem)] grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Resource Toolbox</CardTitle>
          <CardDescription>Drag & drop to build.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {resources.map((res) => (
            <Button key={res.name} variant="secondary" className="justify-start gap-2 cursor-grab active:cursor-grabbing">
              <res.icon className="h-4 w-4" />
              {res.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Migration Blueprint</CardTitle>
              <CardDescription>Visual representation of your new infrastructure.</CardDescription>
            </div>
            <Button size="sm">
                <Cog className="mr-2 h-4 w-4"/>
                Deploy
            </Button>
        </CardHeader>
        <CardContent className="flex-1">
            <div className="relative h-full w-full rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-6">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(128,128,128,0.1)_0%,_transparent_50%)] bg-[length:2rem_2rem]"></div>
                 <div className="relative grid grid-cols-2 gap-8">
                     {components.map(comp => (
                         <div key={comp.id} onClick={() => setSelected(comp)}
                              className={cn("p-4 rounded-lg border bg-card cursor-pointer transition-all",
                              selected?.id === comp.id ? "border-primary shadow-lg scale-105" : "hover:border-primary/50 hover:shadow-md")}>
                             <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md bg-secondary">
                                    {comp.type === "Compute" && <Server className="h-6 w-6 text-primary"/>}
                                    {comp.type === "Database" && <Database className="h-6 w-6 text-primary"/>}
                                </div>
                                <div>
                                    <p className="font-semibold">{comp.name}</p>
                                    <p className="text-sm text-muted-foreground">{comp.type}</p>
                                </div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Properties</CardTitle>
          <CardDescription>Edit component details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {selected ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Component Name</Label>
                <Input id="name" value={selected.name} onChange={(e) => setSelected({...selected, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Component Type</Label>
                <Input id="type" value={selected.type} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instance">Instance Size</Label>
                <Input id="instance" value={selected.properties.instanceSize} onChange={(e) => handlePropertyChange('instanceSize', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Input id="region" value={selected.properties.region} onChange={(e) => handlePropertyChange('region', e.target.value)} />
              </div>
               {selected.properties.version && <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input id="version" value={selected.properties.version} onChange={(e) => handlePropertyChange('version', e.target.value)} />
              </div>}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a component to edit its properties.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
