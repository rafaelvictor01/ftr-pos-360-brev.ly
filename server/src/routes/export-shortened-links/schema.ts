import z from "zod"

export const exportSchema = {
  schema: {
    summary: "Export shortened links",
    tags: ["Shortened Links"],
    response: {
      200: z
        .object({ reportUrl: z.string() })
        .describe("Shortened links exported successfully."),
    },
  },
}
