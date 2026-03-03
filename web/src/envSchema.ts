import { z } from "zod"

export const envSchema = z.object({
  VITE_PORT: z.coerce.number().default(4000),
  VITE_BACKEND_URL: z.url().default("http://localhost:3333"),
})
