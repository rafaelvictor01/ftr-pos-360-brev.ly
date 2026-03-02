import z from "zod"

export const deleteShortenedLinkSchema = {
  schema: {
    summary: "Delete shortened link",
    tags: ["Shortened Links"],
    params: z.object({
      shortenedLinkId: z.string(),
    }),
    response: {
      204: z
        .undefined()
        .describe("Shortened link has been successfully deleted."),
      404: z
        .object({ message: z.string() })
        .describe(
          "No shortened link was found for the shortened link provided in the URL path.",
        ),
    },
  },
}
