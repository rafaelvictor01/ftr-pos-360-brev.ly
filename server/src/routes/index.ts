import { FastifyInstance } from "fastify"

import { deleteShortenedLink } from "./delete-shortened-link"
import { exportShortenedLinksRoute } from "./export-shortened-links"
import { healthRoute } from "./health"
import { increaseAccessShortenedLinks } from "./increase-access"
import { listShortenedLinks } from "./list-shortened-links"
import { postShortenedLink } from "./post-shortened-link"
import { redirectToOriginalLink } from "./redirect-to-original-link"

export async function appRoutes(server: FastifyInstance): Promise<void> {
  server.register(healthRoute)

  server.register(postShortenedLink)
  server.register(listShortenedLinks)
  server.register(deleteShortenedLink)
  server.register(redirectToOriginalLink)
  server.register(increaseAccessShortenedLinks)
  server.register(exportShortenedLinksRoute)
}
