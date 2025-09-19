'use server';
/**
 * @fileOverview A simple chatbot flow.
 *
 * - chatbot - A function that handles chatbot conversations.
 * - ChatbotInput - The input type for the chatbot function.
 * - ChatbotOutput - The return type for the chatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotMessageSchema = z.object({
    role: z.enum(['user', 'bot']),
    text: z.string(),
});

const ChatbotInputSchema = z.object({
  query: z.string().describe('The user\'s latest message.'),
  history: z.array(ChatbotMessageSchema).describe('The conversation history.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.string().describe('The chatbot\'s response.');
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function chatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return chatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: ChatbotInputSchema},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are a helpful AI assistant for the SkillMapper AI application. Your goal is to assist users with their career-related questions. Be friendly, concise, and encouraging.

Conversation History:
{{#each history}}
  {{#if (eq role 'user')}}User: {{text}}{{/if}}
  {{#if (eq role 'bot')}}Bot: {{text}}{{/if}}
{{/each}}

User's new message:
{{{query}}}

Your response:
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
