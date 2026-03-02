import { z } from "zod"

export const healthSchema = {
  schema: {
    summary: "Health check",
    tags: ["Health"],
    response: {
      200: z.object({ status: z.string(), timestamp: z.string() }),
    },
  },
}
