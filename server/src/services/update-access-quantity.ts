import { eq, sql } from "drizzle-orm"

import { UpdateAccessQuantitySchemaDTO } from "@/dtos/update-access-quantity"
import { ShortenedLinkNotAvailable } from "@/errors/shortened-link-not-available"
import { db } from "@/infra/db"
import { schemas } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/utils/either"

export async function updateAccessQuantity(
  shortenedLinkId: string,
): Promise<Either<ShortenedLinkNotAvailable, UpdateAccessQuantitySchemaDTO>> {
  const shortenedLinksSchema = schemas.shortenedLinks

  const [shortenedLinkInfo] = await db
    .update(shortenedLinksSchema)
    .set({
      quantityAccesses: sql`${shortenedLinksSchema.quantityAccesses} + 1`,
    })
    .where(eq(shortenedLinksSchema.id, shortenedLinkId))
    .returning({
      originalLink: shortenedLinksSchema.originalLink,
      shortenedLink: shortenedLinksSchema.shortenedLink,
      quantityAccesses: shortenedLinksSchema.quantityAccesses,
    })

  if (!shortenedLinkInfo) return makeLeft(new ShortenedLinkNotAvailable())

  return makeRight(shortenedLinkInfo)
}
