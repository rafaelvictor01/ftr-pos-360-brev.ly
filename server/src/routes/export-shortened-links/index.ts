import { FastifyPluginAsync } from "fastify"

import { exportShortenedLinks } from "@/services/export-shortened-links"
import { unwrapEither } from "@/utils/either"

import { exportSchema } from "./schema"

const PATH = "/shortened-links/export"

export const exportShortenedLinksRoute: FastifyPluginAsync = async (server) => {
  server.get(PATH, exportSchema, async (_, reply) => {
    const result = await exportShortenedLinks()

    const { reportUrl } = unwrapEither(result)

    return reply.status(200).send({ reportUrl })
  })
}
