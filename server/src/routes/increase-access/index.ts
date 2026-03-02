import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { updateAccessQuantity } from "@/services/update-access-quantity"
import { isRight, unwrapEither } from "@/utils/either"

import { increaseAccessShortenedLinksSchema } from "./schema"

const PATH = "/shortened-links/increase-access/:shortenedLinkId"

export const increaseAccessShortenedLinks: FastifyPluginAsyncZod = async (
  server,
) => {
  server.patch(
    PATH,
    increaseAccessShortenedLinksSchema,
    async (request, reply) => {
      const shortenedLinkId = request.params.shortenedLinkId

      const result = await updateAccessQuantity(shortenedLinkId)

      if (isRight(result)) {
        const { originalLink, shortenedLink, quantityAccesses } =
          unwrapEither(result)

        return reply
          .status(200)
          .send({ originalLink, shortenedLink, quantityAccesses })
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case "ShortenedLinkNotAvailable":
          return reply.status(404).send({ message: error.message })
      }
    },
  )
}
