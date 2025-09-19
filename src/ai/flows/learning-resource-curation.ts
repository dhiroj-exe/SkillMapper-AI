// src/ai/flows/learning-resource-curation.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for curating learning resources based on identified skill gaps.
 *
 * - learningResourceCuration - A function that suggests courses, tutorials, and resources to bridge skill gaps.
 * - LearningResourceCurationInput - The input type for the learningResourceCuration function.
 * - LearningResourceCurationOutput - The return type for the learningResourceCuration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LearningResourceCurationInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of skills the user currently possesses.'),
  desiredCareerPath: z
    .string()
    .describe('The career path the user is interested in pursuing.'),
});
export type LearningResourceCurationInput = z.infer<
  typeof LearningResourceCurationInputSchema
>;

const LearningResourceCurationOutputSchema = z.object({
  skillGaps: z
    .array(z.string())
    .describe('A list of skills the user needs to acquire to reach their desired career path.'),
  recommendedResources: z
    .array(z.string())
    .describe(
      'A list of recommended learning resources (courses, tutorials, etc.) to bridge the skill gaps.'
    ),
});
export type LearningResourceCurationOutput = z.infer<
  typeof LearningResourceCurationOutputSchema
>;

export async function learningResourceCuration(
  input: LearningResourceCurationInput
): Promise<LearningResourceCurationOutput> {
  return learningResourceCurationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'learningResourceCurationPrompt',
  input: {schema: LearningResourceCurationInputSchema},
  output: {schema: LearningResourceCurationOutputSchema},
  prompt: `You are an AI career advisor. A user is trying to move into the career path "{{{desiredCareerPath}}}".

The user currently has these skills:
{{#if userSkills}}
  {{#each userSkills}}
    - {{{this}}}
  {{/each}}
{{else}}
  No skills listed.
{{/if}}

Identify the skills the user needs to acquire to reach their desired career path, and suggest specific learning resources (courses, tutorials, etc.) to bridge those skill gaps.
`,
});

const learningResourceCurationFlow = ai.defineFlow(
  {
    name: 'learningResourceCurationFlow',
    inputSchema: LearningResourceCurationInputSchema,
    outputSchema: LearningResourceCurationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
