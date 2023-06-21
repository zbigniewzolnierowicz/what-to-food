import { z } from 'zod';

export const configSchema = z.object({
  MONGO_URL: z.string(),
});
