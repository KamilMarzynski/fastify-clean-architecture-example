import { type FastifyInstance } from 'fastify'
import { UserModule } from './user/user.module'
import { type Db } from 'mongodb'
import { type AppConfig } from '../_lib/core/config'

interface AppDependencies {
  server: FastifyInstance
  db: Db
  config: AppConfig
}

export const initApp = (deps: AppDependencies): void => {
  const userModule = new UserModule(deps)
  userModule.init()
}
