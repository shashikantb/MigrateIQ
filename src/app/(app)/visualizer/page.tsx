"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const initialNodes = [
  { id: 1, type: "Compute", name: "Frontend App", x: 25, y: 50, connections: [2, 3] },
  { id: 2, type: "Compute", name: "Backend API", x: 50, y: 25, connections: [4] },
  { id: 3, type: "Compute", name: "Auth Service", x: 50, y: 75, connections: [4, 5] },
  { id: 4, type: "DB", name: "Primary Database", x: 75, y: 50, connections: [] },
  { id: 5, type: "Secrets", name: "API Keys Vault", x: 75, y: 90, connections: [] },
];

const nodeColors: { [key: string]: string } = {
  Compute: "bg-yellow-400 border-yellow-500",
  DB: "bg-blue-400 border-blue-500",
  Secrets: "bg-red-400 border-red-500",
};

export default function VisualizerPage() {
  const [nodes, setNodes] = useState(initialNodes.map(n => ({...n, dx:0, dy:0})));
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const edges = nodes.flatMap(sourceNode =>
    sourceNode.connections.map(targetId => {
      const targetNode = nodes.find(n => n.id === targetId);
      return { source: sourceNode, target: targetNode };
    })
  );
  
  const handleMouseEnter = (nodeId: number) => {
    setHoveredNode(nodeId);
    setNodes(currentNodes => currentNodes.map(n => {
        const isConnected = initialNodes.find(hn => hn.id === nodeId)?.connections.includes(n.id) || n.id === nodeId;
        return isConnected ? n : {...n, dx: (Math.random()-0.5) * 5, dy: (Math.random()-0.5) * 5};
    }))
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
     setNodes(currentNodes => currentNodes.map(n => ({...n, dx: 0, dy: 0})))
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dependency Visualizer</CardTitle>
        <CardDescription>
          Visualize the relationships between your application components.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[70vh] w-full">
        <TooltipProvider>
          <div className="relative h-full w-full rounded-lg border bg-muted/20 overflow-hidden">
            <svg className="absolute inset-0 h-full w-full">
              <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="0" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#9ca3af" />
                  </marker>
              </defs>
              {edges.map(({ source, target }, index) => {
                 if (!target) return null;
                 const isHovered = hoveredNode === source.id || hoveredNode === target.id;
                 return (
                  <line
                    key={index}
                    x1={`${source.x + source.dx}%`}
                    y1={`${source.y + source.dy}%`}
                    x2={`${target.x + target.dx}%`}
                    y2={`${target.y + target.dy}%`}
                    className={cn("stroke-muted-foreground/50 transition-all duration-300", isHovered && "stroke-primary/80 stroke-2")}
                    markerEnd="url(#arrowhead)"
                  />
                 );
              })}
            </svg>
            {nodes.map(node => {
                const isHovered = hoveredNode === node.id;
                const isDimmed = hoveredNode !== null && !isHovered && !nodes.find(hn => hn.id === hoveredNode)?.connections.includes(node.id)

                return (
                <Tooltip key={node.id} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div
                      onMouseEnter={() => handleMouseEnter(node.id)}
                      onMouseLeave={handleMouseLeave}
                      style={{ left: `${node.x + node.dx}%`, top: `${node.y + node.dy}%` }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 p-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md border-2",
                        nodeColors[node.type],
                        isHovered && 'scale-110 shadow-lg',
                        isDimmed && 'opacity-30'
                      )}
                    >
                      <span className="font-semibold text-white text-shadow-sm">{node.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-bold">{node.name}</p>
                    <p className="text-muted-foreground">Type: {node.type}</p>
                  </TooltipContent>
                </Tooltip>
                )
            })}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
