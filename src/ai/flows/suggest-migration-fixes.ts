// Implemented by the Assistant.
'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting automated fixes for migration issues.
 *
 * - suggestMigrationFixes - A function that takes a migration blueprint and returns suggested fixes.
 * - SuggestMigrationFixesInput - The input type for the suggestMigrationFixes function.
 * - SuggestMigrationFixesOutput - The return type for the suggestMigrationFixes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMigrationFixesInputSchema = z.object({
  blueprint: z
    .string()
    .describe("The application's blueprint, describing its architecture and dependencies."),
});
export type SuggestMigrationFixesInput = z.infer<typeof SuggestMigrationFixesInputSchema>;

const SuggestMigrationFixesOutputSchema = z.object({
  fixes: z
    .array(z.string())
    .describe('An array of suggested automated fixes for detected migration issues.'),
  log: z.string().describe('The log of migration issue detections and fixes.'),
});
export type SuggestMigrationFixesOutput = z.infer<typeof SuggestMigrationFixesOutputSchema>;

export async function suggestMigrationFixes(input: SuggestMigrationFixesInput): Promise<SuggestMigrationFixesOutput> {
  return suggestMigrationFixesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMigrationFixesPrompt',
  input: {schema: SuggestMigrationFixesInputSchema},
  output: {schema: SuggestMigrationFixesOutputSchema},
  prompt: `You are an AI migration expert specializing in suggesting automated fixes for migration issues based on the application's blueprint.

  Analyze the provided application blueprint and provide a list of suggested automated fixes to resolve migration issues.

  Blueprint:
  {{blueprint}}

  Respond with fixes and log.
  Here's an example of good output:
  {
    "fixes": ["Fix 1: Replace deprecated library X with library Y", "Fix 2: Update API endpoint from /v1 to /v2"],
    "log": "Detected deprecated library X. Suggested replacement with library Y. Detected outdated API endpoint /v1. Suggested update to /v2."
  }
  `,
});

const suggestMigrationFixesFlow = ai.defineFlow(
  {
    name: 'suggestMigrationFixesFlow',
    inputSchema: SuggestMigrationFixesInputSchema,
    outputSchema: SuggestMigrationFixesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
