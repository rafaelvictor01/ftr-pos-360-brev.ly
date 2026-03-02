import { FastifyInstance } from "fastify"

import { deleteShortenedLink } from "./delete-shortened-link"
import { healthRoute } from "./health"
import { listShortenedLinks } from "./list-shortened-links"
import { postShortenedLink } from "./post-shortened-link"

export async function appRoutes(server: FastifyInstance): Promise<void> {
  server.register(healthRoute)

  server.register(postShortenedLink)
  server.register(listShortenedLinks)
  server.register(deleteShortenedLink)
}
