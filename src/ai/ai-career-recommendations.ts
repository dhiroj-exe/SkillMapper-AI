'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered career recommendations based on user skills, interests, and experience.
 *
 * - aiCareerRecommendations - A function that initiates the career recommendation process.
 * - AiCareerRecommendationsInput - The input type for the aiCareerRecommendations function.
 * - AiCareerRecommendationsOutput - The return type for the aiCareerRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiCareerRecommendationsInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of skills the user possesses.'),
  interests: z
    .array(z.string())
    .describe('A list of the user interests.'),
  experience: z
    .string()
    .describe('A description of the user experience.'),
});
export type AiCareerRecommendationsInput = z.infer<typeof AiCareerRecommendationsInputSchema>;

const AiCareerRecommendationsOutputSchema = z.object({
  careerRecommendations: z
    .array(z.string())
    .describe('A list of recommended career paths.'),
  skillGaps: z
    .array(z.string())
    .describe('A list of skills the user needs to develop.'),
  learningResources: z
    .array(z.string())
    .describe('A list of learning resources to close skill gaps.'),
  careerGrowthPaths: z
    .array(z.string())
    .describe('A list of potential career growth paths.'),
});
export type AiCareerRecommendationsOutput = z.infer<typeof AiCareerRecommendationsOutputSchema>;

export async function aiCareerRecommendations(
  input: AiCareerRecommendationsInput
): Promise<AiCareerRecommendationsOutput> {
  return aiCareerRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiCareerRecommendationsPrompt',
  input: {schema: AiCareerRecommendationsInputSchema},
  output: {schema: AiCareerRecommendationsOutputSchema},
  prompt: `You are an AI career advisor. Based on the user's skills, interests, and experience, provide career recommendations, identify skill gaps, suggest learning resources, and outline potential career growth paths.

Skills: {{{skills}}}
Interests: {{{interests}}}
Experience: {{{experience}}}

Provide the recommendations in the requested JSON format.`,
});

const aiCareerRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiCareerRecommendationsFlow',
    inputSchema: AiCareerRecommendationsInputSchema,
    outputSchema: AiCareerRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
