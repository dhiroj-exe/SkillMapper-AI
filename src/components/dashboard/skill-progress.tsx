"use client"

import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  level: number
}

interface SkillProgressProps {
  skills: Skill[]
}

export function SkillProgress({ skills }: SkillProgressProps) {
  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={index}>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-medium">{skill.name}</h4>
            <span className="text-sm text-muted-foreground">{skill.level}%</span>
          </div>
          <Progress value={skill.level} aria-label={`${skill.name} progress`} />
        </div>
      ))}
    </div>
  )
}
