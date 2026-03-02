import { FastifyInstance } from "fastify"

import { healthRoute } from "./health"
import { postShortenedLink } from "./post-shortened-link"

export async function appRoutes(server: FastifyInstance): Promise<void> {
  server.register(healthRoute)

  server.register(postShortenedLink)
}
