'use server';
/**
 * @fileOverview A Genkit flow that suggests careers based on a quiz.
 *
 * - careerQuizFlow - A function that suggests careers based on quiz answers.
 * - CareerQuizInput - The input type for the careerQuizFlow function.
 * - CareerQuizOutput - The return type for the careerQuizFlow function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CareerQuizInputSchema = z.object({
  answers: z.array(z.string()).describe('An array of answers to the quiz questions.'),
});
export type CareerQuizInput = z.infer<typeof CareerQuizInputSchema>;

const CareerQuizOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      career: z.string().describe('The recommended career path.'),
      pros: z.array(z.string()).describe('A list of pros for this career.'),
      cons: z.array(z.string()).describe('A list of cons for this career.'),
      salaryTrend: z.string().describe('The future salary trend for this career.'),
    })
  ).describe('A list of 3 recommended careers with pros, cons, and salary trends.'),
});
export type CareerQuizOutput = z.infer<typeof CareerQuizOutputSchema>;

const prompt = ai.definePrompt({
  name: 'careerQuizPrompt',
  input: { schema: CareerQuizInputSchema },
  output: { schema: CareerQuizOutputSchema },
  prompt: `You are a career advisor AI. A user has answered a 10-question quiz about their personality and interests. Based on their answers, recommend 3 career paths. For each career, provide a list of pros and cons, and a projection of future salary trends.

The user's answers are:
{{#each answers}}
- {{{this}}}
{{/each}}

Provide the output in the requested JSON format.
`,
});

const careerQuizFlow = ai.defineFlow(
  {
    name: 'careerQuizFlow',
    inputSchema: CareerQuizInputSchema,
    outputSchema: CareerQuizOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

export async function careerQuiz(input: CareerQuizInput): Promise<CareerQuizOutput> {
  return careerQuizFlow(input);
}
