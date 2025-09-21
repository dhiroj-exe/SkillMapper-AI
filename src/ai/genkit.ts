import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Support common env var names for Gemini/Google AI Studio API keys
const GEMINI_API_KEY =
  process.env.AIzaSyAIgNHdtUruJvH8R23mh569r0dKmWDhq68 ||
  process.env.AIzaSyAIgNHdtUruJvH8R23mh569r0dKmWDhq68 ||
  process.env.AIzaSyAIgNHdtUruJvH8R23mh569r0dKmWDhq68 ||
  undefined;

// Optionally allow overriding the model via env
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'googleai/gemini-2.5-flash';

// Create the Google AI plugin; if no API key is provided, it will rely on env resolution.
const googlePlugin = GEMINI_API_KEY ? googleAI({ apiKey: GEMINI_API_KEY }) : googleAI();

export const ai = genkit({
  plugins: [googlePlugin],
  model: GEMINI_MODEL,
});