import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { removeShortenedLink } from "@/services/remove-shortened-link"
import { isRight, unwrapEither } from "@/utils/either"

import { deleteShortenedLinkSchema } from "./schema"

const PATH = "/shortened-links/:shortenedLinkId"

export const deleteShortenedLink: FastifyPluginAsyncZod = async (server) => {
  server.delete(PATH, deleteShortenedLinkSchema, async (request, reply) => {
    const shortenedLinkId = request.params.shortenedLinkId

    const result = await removeShortenedLink(shortenedLinkId)

    if (isRight(result)) return reply.status(204).send()

    const error = unwrapEither(result)

    switch (error.constructor.name) {
      case "ShortenedLinkNotAvailable":
        return reply.status(404).send({ message: error.message })
    }
  })
}
