import { type FastifyInstance } from 'fastify'
import { makeServer } from '../frameworks/server/server'
import { type AppConfig } from './config'
import { type Db } from 'mongodb'
import { makeDb } from '../frameworks/db/mongo'
import { type Controller } from './controller'
import { HttpApplicationControllerFactory, type ApplicationControllerFactory } from '../../app/application-controller.factory'

export interface AppDependencies {
  server: FastifyInstance
  db: Db
  config: AppConfig
  controllerFactory: ApplicationControllerFactory
  controllers?: Controller[]
}

export const makeDependencyContainer = async (deps: { config: AppConfig }): Promise<AppDependencies> => {
  const server = makeServer()
  const db = await makeDb(deps)

  const transportType = deps.config.transportType
  let applicationControllerFactory: ApplicationControllerFactory

  if (transportType === 'http') {
    applicationControllerFactory = new HttpApplicationControllerFactory()
  } else {
    throw new Error('Unsupported transport type')
  }

  return {
    server,
    db,
    config: deps.config,
    controllerFactory: applicationControllerFactory
  }
}
