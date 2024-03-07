import { type FastifyInstance } from 'fastify'
import { UserModule } from './user/user.module'

interface AppDependencies {
  server: FastifyInstance
}

export const initApp = (deps: AppDependencies): void => {
  const userModule = new UserModule(deps)
  userModule.init()
}
