import z from "zod"

export const redirectToOriginalLinkSchema = {
  schema: {
    summary: "Get original link from shortened link",
    tags: ["Shortened Links"],
    params: z.object({
      shortenedLink: z.string(),
    }),
    response: {
      200: z
        .object({
          originalLink: z.string(),
        })
        .describe(
          "Returns the original link corresponding to the shortened link.",
        ),
      404: z
        .object({ message: z.string() })
        .describe(
          "No original link was found for the shortened link provided in the URL path.",
        ),
    },
  },
}
