import z from "zod"

export const increaseAccessShortenedLinksSchema = {
  schema: {
    summary: "Update access quantity",
    tags: ["Shortened Links"],
    params: z.object({
      shortenedLink: z.string(),
    }),
    response: {
      200: z
        .object({
          originalLink: z.string(),
          shortenedLink: z.string(),
          quantityAccesses: z.number(),
        })
        .describe(
          "Successfully incremented the access count for the shortened link.",
        ),
      404: z
        .object({ message: z.string() })
        .describe(
          "No original link was found for the shortened link provided in the URL path.",
        ),
    },
  },
}
