import { FastifyPluginAsync } from "fastify"
import { z } from "zod"

export const healthRoute: FastifyPluginAsync = async (server) => {
  server.get(
    "/health",
    {
      schema: {
        summary: "Health check",
        tags: ["Health"],
        response: {
          200: z.object({ status: z.string(), timestamp: z.string() }),
        },
      },
    },
    async (_request, reply) => {
      return reply.status(200).send({
        status: "ok",
        timestamp: new Date().toISOString(),
      })
    },
  )
}
