import { FastifyInstance } from "fastify"

import { healthRoute } from "./health"

export async function appRoutes(server: FastifyInstance): Promise<void> {
  server.register(healthRoute)
}
