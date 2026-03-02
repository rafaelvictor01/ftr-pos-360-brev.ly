import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

import { getShortenedLinks } from "@/services/get-shortened-links"
import { unwrapEither } from "@/utils/either"

import { listShortenedLinksSchema } from "./schema"

const PATH = "/shortened-links"

export const listShortenedLinks: FastifyPluginAsyncZod = async (server) => {
  server.get(PATH, listShortenedLinksSchema, async (_request, reply) => {
    const result = await getShortenedLinks()

    const { total, data } = unwrapEither(result)

    return reply.code(200).send({ total: total || 0, data })
  })
}
