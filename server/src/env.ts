import z from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),

  // Database
  DATABASE_URL: z.url().startsWith("postgresql://"),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.string().default("5432"),

  // Cloudflare
  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_PUBLIC_BUCKET_URL: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
