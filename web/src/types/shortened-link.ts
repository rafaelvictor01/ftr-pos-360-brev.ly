import z from "zod"

export const shortenedLinkSchema = z.object({
  id: z.string(),
  originalLink: z.string(),
  shortenedLink: z.string(),
  quantityAccesses: z.number(),
  createdAt: z.date(),
})

export type ShortenedLinkSchemaDTO = z.input<typeof shortenedLinkSchema>
