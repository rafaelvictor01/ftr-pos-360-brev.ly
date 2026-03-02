import {
  CreateShortenedLinkDTO,
  createShortenedLinkSchema,
} from "@/dtos/create-shortened-link"
import { DuplicateShortenedLink } from "@/errors/duplicate-shortened-link"
import { db } from "@/infra/db"
import { schemas } from "@/infra/db/schemas"
import { Either, makeLeft, makeRight } from "@/utils/either"
import { getPostgresError } from "@/utils/get-postgres-error"

const DUPLICATED_KEY_VALUE_VIOLATES_UNIQUE_CONSTRAINT_ERROR_CODE = "23505"

export async function createShortenedLink(
  input: CreateShortenedLinkDTO,
): Promise<Either<DuplicateShortenedLink, { id: string }>> {
  const { originalLink, shortenedLink } = createShortenedLinkSchema.parse(input)

  const shortenedLinksSchema = schemas.shortenedLinks

  try {
    const [newShortenedLink] = await db
      .insert(shortenedLinksSchema)
      .values({ originalLink, shortenedLink })
      .returning({ id: shortenedLinksSchema.id })

    return makeRight({ id: newShortenedLink.id })
  } catch (error: unknown) {
    const pgError = getPostgresError(error)

    const isDuplicateShortenedLinkError =
      pgError?.code ===
      DUPLICATED_KEY_VALUE_VIOLATES_UNIQUE_CONSTRAINT_ERROR_CODE

    if (isDuplicateShortenedLinkError)
      return makeLeft(new DuplicateShortenedLink())

    throw error
  }
}
