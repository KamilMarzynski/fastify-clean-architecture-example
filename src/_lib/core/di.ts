import { type FastifyInstance } from 'fastify'
import { makeServer } from '../frameworks/server/server'
import { type AppConfig } from './config'

export interface AppDependencies {
  server: FastifyInstance
  config: AppConfig
}

export const makeDependencyContainer = (deps: { config: AppConfig }): AppDependencies => {
  const server = makeServer()

  return {
    server,
    config: deps.config
  }
}
