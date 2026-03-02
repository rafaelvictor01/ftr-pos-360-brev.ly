import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { createShortenedLink } from "@/services/create-shortened-link"
import { isRight, unwrapEither } from "@/utils/either"

import { postShortenedLinkSchema } from "./schema"

const PATH = "/shortened-links"

export const postShortenedLink: FastifyPluginAsyncZod = async (server) => {
  server.post(PATH, postShortenedLinkSchema, async (request, reply) => {
    const { originalLink, shortenedLink } = request.body

    const result = await createShortenedLink({ originalLink, shortenedLink })

    if (isRight(result)) {
      const { id } = unwrapEither(result)

      return reply
        .header("location", `/shortened-links/${id}`)
        .status(201)
        .send({ id })
    }

    const error = unwrapEither(result)

    switch (error.constructor.name) {
      case "DuplicateShortenedLink":
        return reply.status(400).send({ message: error.message })
    }
  })
}
