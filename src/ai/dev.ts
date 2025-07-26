import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-migration-fixes.ts';
import '@/ai/flows/generate-migration-blueprint.ts';