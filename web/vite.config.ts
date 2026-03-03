import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

import { envSchema } from "./src/envSchema"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = envSchema.parse(loadEnv(mode, process.cwd(), "VITE_"))

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: env.VITE_PORT,
      watch: {
        ignored: ["**/*.spec.ts", "**/*.spec.tsx"],
      },
    },
    build: {
      sourcemap: true,
    },
  }
})
