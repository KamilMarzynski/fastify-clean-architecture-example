import { type FastifyInstance } from 'fastify'
import { makeServer } from '../frameworks/server/server'
import { type AppConfig } from './config'
import { type Db } from 'mongodb'
import { makeDb } from '../frameworks/db/mongo'
import { type HttpController } from './http'

export interface AppDependencies {
  server: FastifyInstance
  db: Db
  config: AppConfig
  controllers: HttpController[]
}

export const makeDependencyContainer = async (deps: { config: AppConfig }): Promise<AppDependencies> => {
  const server = makeServer()
  const db = await makeDb(deps)

  return {
    server,
    db,
    config: deps.config,
    controllers: []
  }
}
