import z from "zod"

export const updateAccessQuantitySchema = z.object({
  originalLink: z.string(),
  shortenedLink: z.string(),
  quantityAccesses: z.number(),
})

export type UpdateAccessQuantitySchemaDTO = z.input<
  typeof updateAccessQuantitySchema
>
