import { z } from "zod"

import { createShortenedLinkSchema } from "@/dtos/create-shortened-link"

export const postShortenedLinkSchema = {
  schema: {
    summary: "Create shortened link",
    tags: ["Shortened Links"],
    body: createShortenedLinkSchema,
    response: {
      201: z
        .object({ id: z.string() })
        .describe("New shortened link created. Returns the link's unique ID."),
      400: z
        .object({ message: z.string() })
        .catchall(z.any())
        .describe("The request was invalid or missing required data."),
    },
  },
}
