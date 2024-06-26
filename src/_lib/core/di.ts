import { type FastifyInstance } from 'fastify'
import { makeServer } from '../frameworks/server/server'
import { type AppConfig } from './config'
import { makeDb } from '../frameworks/db/mongo'
import { type Controller } from './controller'
import { HttpApplicationControllerFactory, type ApplicationControllerFactory } from '../../app/bootstrap/factories/controllers'
import { MongoApplicationRepositoryFactory, type ApplicationRepositoryFactory, LocalApplicationRepositoryFactory } from '../../app/bootstrap/factories/repositories'
import { HttpTransportFactory, type TransportFactory } from './transport'

export interface AppDependencies {
  server: FastifyInstance
  config: AppConfig
  controllerFactory: ApplicationControllerFactory
  repositoryFactory: ApplicationRepositoryFactory
  transportFactory: TransportFactory
  controllers?: Controller[]
}

export const makeDependencyContainer = async (deps: { config: AppConfig }): Promise<AppDependencies> => {
  const server = makeServer()

  const transportType = deps.config.transportType

  let applicationControllerFactory: ApplicationControllerFactory
  if (transportType === 'http') {
    applicationControllerFactory = new HttpApplicationControllerFactory()
  } else {
    throw new Error('Unsupported transport type')
  }

  let transportFactory: TransportFactory
  if (transportType === 'http') {
    transportFactory = new HttpTransportFactory()
  } else {
    throw new Error('Unsupported transport type')
  }

  let applicationRepositoryFactory: ApplicationRepositoryFactory
  switch (deps.config.persistenceType) {
    case 'mongo': {
      const db = await makeDb(deps)
      applicationRepositoryFactory = new MongoApplicationRepositoryFactory(db)
      break
    }
    case 'memory': {
      applicationRepositoryFactory = new LocalApplicationRepositoryFactory()
      break
    }
    default:
      throw new Error('Unsupported persistence type')
  }

  return {
    server,
    config: deps.config,
    transportFactory,
    controllerFactory: applicationControllerFactory,
    repositoryFactory: applicationRepositoryFactory
  }
}
