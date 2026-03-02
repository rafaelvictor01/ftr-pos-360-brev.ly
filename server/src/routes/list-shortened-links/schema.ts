import z from "zod"

import { shortenedLinkSchema } from "@/dtos/shortened-link"

export const listShortenedLinksSchema = {
  schema: {
    summary: "Get shortened links",
    tags: ["Shortened Links"],
    response: {
      200: z
        .object({
          total: z.number().default(0),
          data: z.array(shortenedLinkSchema),
        })
        .describe("List of shortened links"),
    },
  },
}
