'use server';
/**
 * @fileOverview A Genkit flow for building a resume.
 *
 * - resumeBuilderFlow - A function that generates resume content.
 * - ResumeBuilderInput - The input type for the resumeBuilderFlow function.
 * - ResumeBuilderOutput - The return type for the resumeBuilderFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ResumeBuilderInputSchema = z.object({
  fullName: z.string().describe("The user's full name."),
  email: z.string().describe("The user's email address."),
  phone: z.string().describe("The user's phone number."),
  linkedin: z.string().optional().describe("A link to the user's LinkedIn profile."),
  github: z.string().optional().describe("A link to the user's GitHub profile."),
  summary: z.string().describe("A professional summary about the user."),
  skills: z.array(z.string()).describe("A list of the user's skills."),
  experience: z.array(z.object({
    jobTitle: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    responsibilities: z.array(z.string()),
  })).describe("The user's work experience."),
  education: z.array(z.object({
    degree: z.string(),
    school: z.string(),
    location: z.string(),
    graduationDate: z.string(),
  })).describe("The user's education."),
});
export type ResumeBuilderInput = z.infer<typeof ResumeBuilderInputSchema>;

export const ResumeBuilderOutputSchema = z.object({
    improvedSummary: z.string().describe("An improved, professionally worded summary."),
    suggestedSkills: z.array(z.string()).describe("A list of suggested skills to add."),
    formattedExperience: z.array(z.object({
        jobTitle: z.string(),
        company: z.string(),
        location: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        formattedResponsibilities: z.array(z.string()).describe("Professionally re-written responsibilities using action verbs."),
    })),
});
export type ResumeBuilderOutput = z.infer<typeof ResumeBuilderOutputSchema>;

export async function resumeBuilder(input: ResumeBuilderInput): Promise<ResumeBuilderOutput> {
  return resumeBuilderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeBuilderPrompt',
  input: { schema: ResumeBuilderInputSchema },
  output: { schema: ResumeBuilderOutputSchema },
  prompt: `You are an expert resume writer and career coach. A user has provided their resume information. Your task is to improve it.

- Rewrite the professional summary to be more impactful and concise.
- Suggest 5-10 additional relevant skills based on their experience and education.
- For each job in their experience, rewrite the responsibilities to be more achievement-oriented, using strong action verbs.

User's Resume Information:
Full Name: {{{fullName}}}
Email: {{{email}}}
Phone: {{{phone}}}
LinkedIn: {{{linkedin}}}
GitHub: {{{github}}}

Professional Summary:
{{{summary}}}

Skills:
{{#each skills}}
- {{{this}}}
{{/each}}

Work Experience:
{{#each experience}}
- Job Title: {{jobTitle}} at {{company}} ({{startDate}} - {{endDate}})
  Responsibilities:
  {{#each responsibilities}}
  - {{{this}}}
  {{/each}}
{{/each}}

Education:
{{#each education}}
- {{degree}} from {{school}} (Graduated: {{graduationDate}})
{{/each}}


Provide your suggestions in the requested JSON format.
`,
});

const resumeBuilderFlow = ai.defineFlow(
  {
    name: 'resumeBuilderFlow',
    inputSchema: ResumeBuilderInputSchema,
    outputSchema: ResumeBuilderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
