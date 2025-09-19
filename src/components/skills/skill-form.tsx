"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  skills: z.array(z.string()).min(1, "Please add at least one skill."),
  career: z.string().min(3, "Please enter a desired career path."),
});

type FormValues = z.infer<typeof formSchema>;

export function SkillForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [skillInput, setSkillInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: ["React", "TypeScript", "Node.js"],
      career: "Full-Stack Developer",
    },
  });

  const { fields, append, remove } = {
    fields: form.getValues("skills"),
    append: (skill: string) => {
        if (skill && !form.getValues("skills").includes(skill)) {
            form.setValue("skills", [...form.getValues("skills"), skill]);
        }
    },
    remove: (index: number) => {
        const newSkills = [...form.getValues("skills")];
        newSkills.splice(index, 1);
        form.setValue("skills", newSkills);
    }
  };


  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      append(skillInput.trim());
      setSkillInput("");
    }
  };

  const handleSkillRemove = (index: number) => {
    remove(index);
  };
  
  const onSubmit = (values: FormValues) => {
    toast({
      title: "Analyzing your profile...",
      description: "Hold tight while our AI works its magic.",
    });
    
    const params = new URLSearchParams({
      skills: values.skills.join(','),
      career: values.career,
    });
    
    router.push(`/recommendations?${params.toString()}`);
  };

  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle className="font-headline">Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <FormLabel>Your Skills</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 rounded-lg border p-2 min-h-[40px]">
                      {fields.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1 text-sm">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(index)}
                            className="rounded-full hover:bg-muted-foreground/20"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </Badge>
                      ))}
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleSkillAdd}
                        className="flex-1 bg-transparent outline-none min-w-[100px] text-sm"
                        placeholder="Type a skill and press Enter"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="career"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Career Path</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AI Engineer, Product Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full group" size="lg">
              Generate Recommendations <Wand2 className="ml-2 h-5 w-5 group-hover:animate-pulse" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
