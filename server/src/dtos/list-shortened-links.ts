import z from "zod"

import { shortenedLinkSchema } from "./shortened-link"

export const listShortenedLinksSchema = z.object({
  total: z.number().default(0),
  data: z.array(shortenedLinkSchema),
})

export type ListShortenedLinksSchemaDTO = z.input<
  typeof listShortenedLinksSchema
>
