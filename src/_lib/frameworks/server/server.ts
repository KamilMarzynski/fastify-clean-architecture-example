import fastify, { type FastifyInstance } from 'fastify'
import { type HttpController } from '../../core/http'
import { type AppConfig } from '../../core/config'

export const makeServer = (): FastifyInstance => {
  return fastify()
}

export const bootstrapServer = (deps: {
  server: FastifyInstance
  config: AppConfig
  controllers: HttpController[]
}): void => {
  const { controllers, server, config } = deps

  controllers.forEach(controller => {
    const routes = controller.routes
    routes.forEach(route => {
      server[route.method](route.path, route.handler)
    })
  })

  server.listen({ host: '0.0.0.0', port: config.port }, (err, address) => {
    if (err !== null) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
