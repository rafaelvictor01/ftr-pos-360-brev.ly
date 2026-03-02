import { FastifyPluginAsync } from "fastify"

import { healthSchema } from "./schema"

export const healthRoute: FastifyPluginAsync = async (server) => {
  server.get("/health", healthSchema, async (_request, reply) => {
    return reply.status(200).send({
      status: "ok",
      timestamp: new Date().toISOString(),
    })
  })
}
