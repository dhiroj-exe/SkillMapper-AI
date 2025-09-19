"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface AnalyticsChartProps {
  data: { name: string; total: number }[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={{
        total: {
          label: "Minutes",
          color: "hsl(var(--primary))",
        },
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: -10 }}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}m`}
            />
            <Tooltip
                cursor={{fill: 'hsl(var(--secondary))', radius: 'var(--radius)'}}
                content={<ChartTooltipContent />}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
