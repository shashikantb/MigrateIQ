"use server"

import {
  generateMigrationBlueprint,
  type GenerateMigrationBlueprintInput,
} from "@/ai/flows/generate-migration-blueprint"
import {
  suggestMigrationFixes,
  type SuggestMigrationFixesInput,
} from "@/ai/flows/suggest-migration-fixes"

export async function getMigrationBlueprint(input: GenerateMigrationBlueprintInput) {
  try {
    const result = await generateMigrationBlueprint(input)
    return { success: true, data: result }
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    return { success: false, error: `Failed to generate blueprint: ${errorMessage}` }
  }
}

export async function getMigrationFixes(input: SuggestMigrationFixesInput) {
  try {
    const result = await suggestMigrationFixes(input)
    return { success: true, data: result }
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred."
    return { success: false, error: `Failed to get recommendations: ${errorMessage}` }
  }
}
