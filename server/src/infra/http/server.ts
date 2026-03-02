import { fastifyCors } from "@fastify/cors"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import { fastify } from "fastify"
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod"

import { env } from "@/env"
import { appRoutes } from "@/routes"

const server = fastify()

// Fastify configs

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
})

server.register(fastifySwagger, {
  openapi: { info: { title: "Brev.ly Docs Server", version: "1.0.0" } },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

// Routes
server.get("/openapi.json", () => server.swagger())

server.register(appRoutes)

// Error Handler
server.setErrorHandler((error, _request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "[TYPE] Validation Error.",
      issues: error.validation,
    })
  }

  // TODO: Enviar o erro para alguma ferramenta de observabilidade
  console.error("[ERROR] - See Logs - ", error)

  return reply.status(500).send({ message: "Internal server error." })
})

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running! PORT: ${env.PORT}`)
  console.log("See Docs: ", `http://localhost:${env.PORT}/docs`)
})
