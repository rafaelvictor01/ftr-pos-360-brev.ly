import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { getOriginalLink } from "@/services/get-original-link"
import { isRight, unwrapEither } from "@/utils/either"

import { redirectToOriginalLinkSchema } from "./schema"

const PATH = "/shortened-links/redirect/:shortenedLink"

export const redirectToOriginalLink: FastifyPluginAsyncZod = async (server) => {
  server.get(PATH, redirectToOriginalLinkSchema, async (request, reply) => {
    const { shortenedLink } = request.params

    const result = await getOriginalLink(shortenedLink)

    if (isRight(result)) {
      const { originalLink } = unwrapEither(result)
      return reply.status(200).send({ originalLink })
    }

    const error = unwrapEither(result)

    switch (error.constructor.name) {
      case "ShortenedLinkNotAvailable":
        return reply.status(404).send({ message: error.message })
    }
  })
}
