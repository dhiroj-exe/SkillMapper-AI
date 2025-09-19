"use client"

import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface RoadmapItem {
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
}

interface CareerRoadmapProps {
  items: RoadmapItem[]
}

export function CareerRoadmap({ items }: CareerRoadmapProps) {
  return (
    <div className="relative">
      <div
        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border"
        aria-hidden="true"
      ></div>
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            <div className="flex h-8 w-8 items-center justify-center shrink-0">
              <span className="relative flex h-8 w-8 items-center justify-center">
                {item.status === "completed" ? (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                ) : (
                  <Circle
                    className={cn(
                      "h-6 w-6",
                      item.status === "current"
                        ? "text-primary animate-pulse"
                        : "text-muted-foreground"
                    )}
                  />
                )}
              </span>
            </div>
            <div className="ml-4">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
