import fastify, { type FastifyInstance } from 'fastify'
import { type HttpController } from '../../core/http'
import { type AppConfig } from '../../core/config'
import { type Controller } from '../../core/controller'

export const makeServer = (): FastifyInstance => {
  return fastify()
}

const isHttpController = (controller: Controller): controller is HttpController => {
  return controller.type === 'http'
}

export const bootstrapServer = (deps: {
  server: FastifyInstance
  config: AppConfig
  controllers?: Controller[]
}): void => {
  const { controllers, server, config } = deps

  if (controllers === undefined) {
    return
  }

  controllers.forEach(controller => {
    // TODO: only for now, before adding more controller types
    // move server type to config and then based on config start the right server type
    // and controllers will then have only this type (eg. http)
    if (isHttpController(controller)) {
      const routes = controller.routes
      routes.forEach(route => {
        server[route.method](route.path, route.handler)
      })
    }
  })

  server.listen({ host: '0.0.0.0', port: config.port }, (err, address) => {
    if (err !== null) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
