import { count, desc } from "drizzle-orm"

import { ListShortenedLinksSchemaDTO } from "@/dtos/list-shortened-links"
import { db } from "@/infra/db"
import { schemas } from "@/infra/db/schemas"
import { Either, makeRight } from "@/utils/either"

export async function getShortenedLinks(): Promise<
  Either<never, ListShortenedLinksSchemaDTO>
> {
  const shortenedLinksSchema = schemas.shortenedLinks

  const [shortenedLinks, [{ total }]] = await Promise.all([
    db
      .select({
        id: shortenedLinksSchema.id,
        originalLink: shortenedLinksSchema.originalLink,
        shortenedLink: shortenedLinksSchema.shortenedLink,
        quantityAccesses: shortenedLinksSchema.quantityAccesses,
        createdAt: shortenedLinksSchema.createdAt,
      })
      .from(shortenedLinksSchema)
      .orderBy(desc(shortenedLinksSchema.createdAt)),
    db
      .select({
        total: count(shortenedLinksSchema.id),
      })
      .from(shortenedLinksSchema),
  ])

  return makeRight({ total: total || 0, data: shortenedLinks })
}
