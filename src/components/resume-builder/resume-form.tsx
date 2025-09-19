"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Wand2, PlusCircle, Trash2, Loader, Sparkles } from "lucide-react";
import { useState } from "react";
import { resumeBuilder, ResumeBuilderOutput } from "@/ai/flows/resume-builder-flow";
import { Separator } from "@/components/ui/separator";

const experienceSchema = z.object({
  jobTitle: z.string().min(1, "Job title is required."),
  company: z.string().min(1, "Company is required."),
  location: z.string().min(1, "Location is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required (or 'Present')."),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required."),
});

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required."),
  school: z.string().min(1, "School is required."),
  location: z.string().min(1, "Location is required."),
  graduationDate: z.string().min(1, "Graduation date is required."),
});


const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  linkedin: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  github: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  summary: z.string().min(20, "Summary should be at least 20 characters."),
  skills: z.array(z.string()).min(3, "Please add at least 3 skills."),
  experience: z.array(experienceSchema).min(1, "Please add at least one work experience."),
  education: z.array(educationSchema).min(1, "Please add at least one education entry."),
});

type FormValues = z.infer<typeof formSchema>;

export function ResumeForm() {
    const [skillInput, setSkillInput] = useState("");
    const [responsibilityInputs, setResponsibilityInputs] = useState<string[]>(['']);
    const [isLoading, setIsLoading] = useState(false);
    const [aiResult, setAiResult] = useState<ResumeBuilderOutput | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "123-456-7890",
            linkedin: "https://linkedin.com/in/janedoe",
            github: "https://github.com/janedoe",
            summary: "A passionate full-stack developer with experience in building web applications using modern technologies.",
            skills: ["React", "TypeScript", "Node.js", "Python"],
            experience: [
                {
                    jobTitle: "Software Engineer",
                    company: "Tech Corp",
                    location: "San Francisco, CA",
                    startDate: "Jan 2022",
                    endDate: "Present",
                    responsibilities: ["Developed new features", "Fixed bugs", "Worked in a team"],
                },
            ],
            education: [
                {
                    degree: "B.S. in Computer Science",
                    school: "State University",
                    location: "San Jose, CA",
                    graduationDate: "May 2021",
                },
            ],
        },
    });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = {
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

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });


  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      appendSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const handleResponsibilityAdd = (expIndex: number, respInput: string) => {
    if (respInput.trim()) {
        const newResponsibilities = [...form.getValues(`experience.${expIndex}.responsibilities`), respInput.trim()];
        form.setValue(`experience.${expIndex}.responsibilities`, newResponsibilities);
        const newRespInputs = [...responsibilityInputs];
        newRespInputs[expIndex] = '';
        setResponsibilityInputs(newRespInputs);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setAiResult(null);
    try {
        const result = await resumeBuilder(values);
        setAiResult(result);
    } catch(e) {
        console.error(e);
        // You could show a toast notification here
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
        <Card className="glassmorphism">
        <CardContent className="p-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Personal Details */}
                    <div className="space-y-4">
                        <h3 className="font-headline text-lg font-semibold">Personal Details</h3>
                        <FormField control={form.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email</FormLabel> <FormControl><Input type="email" {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="linkedin" render={({ field }) => ( <FormItem> <FormLabel>LinkedIn Profile</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="github" render={({ field }) => ( <FormItem> <FormLabel>GitHub Profile</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                    </div>

                    {/* Summary & Skills */}
                    <div className="space-y-4">
                        <h3 className="font-headline text-lg font-semibold">Summary & Skills</h3>
                        <FormField control={form.control} name="summary" render={({ field }) => ( <FormItem> <FormLabel>Professional Summary</FormLabel> <FormControl><Textarea {...field} rows={5} /></FormControl> <FormMessage /> </FormItem> )} />
                        <FormField control={form.control} name="skills" render={() => (
                            <FormItem>
                                <FormLabel>Your Skills</FormLabel>
                                <FormControl>
                                    <div className="flex flex-wrap gap-2 rounded-lg border p-2 min-h-[40px]">
                                    {skillFields.map((skill, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1 text-sm">
                                        {skill}
                                        <button type="button" onClick={() => removeSkill(index)} className="rounded-full hover:bg-muted-foreground/20" >
                                            <X className="h-4 w-4" />
                                        </button>
                                        </Badge>
                                    ))}
                                    <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleSkillAdd}
                                        className="flex-1 bg-transparent outline-none min-w-[100px] text-sm" placeholder="Type a skill and press Enter" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )} />
                    </div>
                </div>

                <Separator />
                
                {/* Experience */}
                <div>
                    <h3 className="font-headline text-lg font-semibold mb-4">Work Experience</h3>
                    <div className="space-y-6">
                    {experienceFields.map((field, index) => (
                        <Card key={field.id} className="bg-background/50">
                            <CardContent className="p-4 space-y-4 relative">
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExperience(index)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name={`experience.${index}.jobTitle`} render={({ field }) => ( <FormItem> <FormLabel>Job Title</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name={`experience.${index}.company`} render={({ field }) => ( <FormItem> <FormLabel>Company</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name={`experience.${index}.location`} render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name={`experience.${index}.startDate`} render={({ field }) => ( <FormItem> <FormLabel>Start Date</FormLabel> <FormControl><Input {...field} placeholder="e.g., Jan 2022" /></FormControl> <FormMessage /> </FormItem> )} />
                                    <FormField control={form.control} name={`experience.${index}.endDate`} render={({ field }) => ( <FormItem> <FormLabel>End Date</FormLabel> <FormControl><Input {...field} placeholder="e.g., Present" /></FormControl> <FormMessage /> </FormItem> )} />
                                </div>
                                <FormField control={form.control} name={`experience.${index}.responsibilities`} render={({ field: { value } }) => (
                                    <FormItem>
                                        <FormLabel>Responsibilities</FormLabel>
                                        <FormControl>
                                            <div>
                                                <ul className="space-y-2 mb-2">
                                                    {value.map((resp, respIndex) => (
                                                        <li key={respIndex} className="flex items-center gap-2 text-sm bg-secondary p-2 rounded-md">
                                                            <span className="flex-1">{resp}</span>
                                                            <button type="button" onClick={() => {
                                                                const currentResps = form.getValues(`experience.${index}.responsibilities`);
                                                                currentResps.splice(respIndex, 1);
                                                                form.setValue(`experience.${index}.responsibilities`, currentResps);
                                                            }}><X className="w-4 h-4" /></button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="flex">
                                                     <Input value={responsibilityInputs[index] || ''} onChange={e => {
                                                        const newRespInputs = [...responsibilityInputs];
                                                        newRespInputs[index] = e.target.value;
                                                        setResponsibilityInputs(newRespInputs);
                                                     }} onKeyDown={e => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleResponsibilityAdd(index, (e.target as HTMLInputElement).value);
                                                        }
                                                     }} placeholder="Add a responsibility and press Enter" />
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            </CardContent>
                        </Card>
                    ))}
                    <Button type="button" variant="outline" onClick={() => {
                        appendExperience({ jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: [] });
                        setResponsibilityInputs([...responsibilityInputs, '']);
                     }}><PlusCircle className="mr-2" />Add Experience</Button>
                    </div>
                </div>

                <Separator />

                {/* Education */}
                <div>
                    <h3 className="font-headline text-lg font-semibold mb-4">Education</h3>
                    <div className="space-y-6">
                    {educationFields.map((field, index) => (
                        <Card key={field.id} className="bg-background/50">
                            <CardContent className="p-4 space-y-4 relative">
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeEducation(index)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                <div className="grid md:grid-cols-2 gap-4">
                                <FormField control={form.control} name={`education.${index}.degree`} render={({ field }) => ( <FormItem> <FormLabel>Degree</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name={`education.${index}.school`} render={({ field }) => ( <FormItem> <FormLabel>School</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name={`education.${index}.location`} render={({ field }) => ( <FormItem> <FormLabel>Location</FormLabel> <FormControl><Input {...field} /></FormControl> <FormMessage /> </FormItem> )} />
                                <FormField control={form.control} name={`education.${index}.graduationDate`} render={({ field }) => ( <FormItem> <FormLabel>Graduation Date</FormLabel> <FormControl><Input {...field} placeholder="e.g., May 2021" /></FormControl> <FormMessage /> </FormItem> )} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                     <Button type="button" variant="outline" onClick={() => appendEducation({ degree: '', school: '', location: '', graduationDate: '' })}><PlusCircle className="mr-2" />Add Education</Button>
                    </div>
                </div>


                <Button type="submit" className="w-full group" size="lg" disabled={isLoading}>
                    {isLoading ? <><Loader className="mr-2 animate-spin" /> Analyzing...</> : <><Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Generate with AI</>}
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>

        {aiResult && (
            <Card className="mt-12 glassmorphism">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-primary"/> AI-Generated Resume Suggestions</CardTitle>
                    <CardDescription>Here are the AI's suggestions to improve your resume. Copy and paste them or use them as inspiration!</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Improved Professional Summary</h3>
                        <p className="text-muted-foreground p-4 bg-secondary rounded-md">{aiResult.improvedSummary}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Suggested Skills</h3>
                        <div className="flex flex-wrap gap-2">
                        {aiResult.suggestedSkills.map((skill, index) => (
                            <Badge key={index} variant="default">{skill}</Badge>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Formatted Experience</h3>
                        <div className="space-y-4">
                            {aiResult.formattedExperience.map((exp, index) => (
                                <div key={index}>
                                    <h4 className="font-semibold">{exp.jobTitle} at {exp.company}</h4>
                                    <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate} | {exp.location}</p>
                                    <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                                        {exp.formattedResponsibilities.map((resp, rIndex) => (
                                            <li key={rIndex}>{resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
    </>
  );
}
