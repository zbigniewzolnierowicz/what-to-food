import { z } from 'zod';

export const configSchema = z.object({
  MARIADB_USER: z.string(),
  MARIADB_PASSWORD: z.string(),
  MARIADB_DATABASE: z.string(),
});
