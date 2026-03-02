import { eq } from "drizzle-orm"

import { ShortenedLinkSchemaDTO } from "@/dtos/shortened-link"
import { ShortenedLinkNotAvailable } from "@/errors/shortened-link-not-available"
import { db } from "@/infra/db"
import { schemas } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/utils/either"

export async function removeShortenedLink(
  shortenedLinkId: string,
): Promise<Either<ShortenedLinkNotAvailable, ShortenedLinkSchemaDTO>> {
  const shortenedLinksSchema = schemas.shortenedLinks

  const auxDeletedInfo = await db
    .delete(shortenedLinksSchema)
    .where(eq(shortenedLinksSchema.id, shortenedLinkId))
    .returning()

  if (auxDeletedInfo.length) return makeRight(auxDeletedInfo[0])

  return makeLeft(new ShortenedLinkNotAvailable())
}
