// A Genkit flow that generates a migration blueprint suggesting GCP services.

'use server';

/**
 * @fileOverview Generates a migration blueprint suggesting GCP services and configurations.
 *
 * - generateMigrationBlueprint - A function that handles the migration blueprint generation.
 * - GenerateMigrationBlueprintInput - The input type for the generateMigrationBlueprint function.
 * - GenerateMigrationBlueprintOutput - The return type for the generateMigrationBlueprint function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InfrastructureScanSchema = z.object({
  apps: z
    .array(z.object({name: z.string(), language: z.string(), db: z.string()}))
    .describe('List of applications found in the infrastructure.'),
  env: z.string().describe('The operating system environment.'),
  services: z.array(z.string()).describe('List of services running.'),
});

const GenerateMigrationBlueprintInputSchema = z.object({
  infrastructureScan: InfrastructureScanSchema.describe(
    'The result of scanning the customer infrastructure.'
  ),
});
export type GenerateMigrationBlueprintInput = z.infer<
  typeof GenerateMigrationBlueprintInputSchema
>;

const MigrationBlueprintComponentSchema = z.object({
  type: z.string().describe('The type of component (e.g., App, DB, Cache).'),
  source: z.string().optional().describe('The original technology used.'),
  target: z.string().describe('The suggested GCP service to migrate to.'),
});

const GenerateMigrationBlueprintOutputSchema = z.object({
  migrate_to: z.string().describe('The target cloud platform (GCP).'),
  components: z.array(MigrationBlueprintComponentSchema).describe(
    'The list of components to migrate and their suggested GCP services.'
  ),
});
export type GenerateMigrationBlueprintOutput = z.infer<
  typeof GenerateMigrationBlueprintOutputSchema
>;

export async function generateMigrationBlueprint(
  input: GenerateMigrationBlueprintInput
): Promise<GenerateMigrationBlueprintOutput> {
  return generateMigrationBlueprintFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMigrationBlueprintPrompt',
  input: {schema: GenerateMigrationBlueprintInputSchema},
  output: {schema: GenerateMigrationBlueprintOutputSchema},
  prompt: `You are an AI expert in cloud migrations, specializing in suggesting GCP services for existing infrastructure components.

  Based on the provided infrastructure scan, generate a migration blueprint that suggests appropriate GCP services to migrate to.

  Consider the following mappings:
  - Node.js apps -> Cloud Run
  - MySQL databases -> Cloud SQL
  - Redis caches -> Memorystore
  - Ubuntu servers -> Compute Engine

  Infrastructure Scan:
  Apps: {{#each infrastructureScan.apps}}{{{this.name}}} ({{{this.language}}}, {{{this.db}}}) {{/each}}
  Environment: {{{infrastructureScan.env}}}
  Services: {{#each infrastructureScan.services}}{{{this}}} {{/each}}

  Output a JSON structure with 'migrate_to' set to 'GCP' and a 'components' array listing each migrated component with its suggested GCP service.

  Ensure that the outputted JSON is valid.
  For items that have no clear mapping, suggest a generic service that will work.
  `,
});

const generateMigrationBlueprintFlow = ai.defineFlow(
  {
    name: 'generateMigrationBlueprintFlow',
    inputSchema: GenerateMigrationBlueprintInputSchema,
    outputSchema: GenerateMigrationBlueprintOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
