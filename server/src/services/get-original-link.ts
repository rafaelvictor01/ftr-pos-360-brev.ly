import { eq } from "drizzle-orm"

import { ShortenedLinkNotAvailable } from "@/errors/shortened-link-not-available"
import { db } from "@/infra/db"
import { schemas } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/utils/either"

export async function getOriginalLink(
  shortenedLink: string,
): Promise<Either<ShortenedLinkNotAvailable, { originalLink: string }>> {
  const shortenedLinksSchema = schemas.shortenedLinks

  const [shortenedLinkInfo] = await db
    .select({ originalLink: shortenedLinksSchema.originalLink })
    .from(shortenedLinksSchema)
    .where(eq(shortenedLinksSchema.shortenedLink, shortenedLink))

  if (!shortenedLinkInfo) return makeLeft(new ShortenedLinkNotAvailable())

  return makeRight({ originalLink: shortenedLinkInfo.originalLink })
}
