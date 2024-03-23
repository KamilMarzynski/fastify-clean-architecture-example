import { type Db } from 'mongodb'
import { UserModule } from './user/user.module'
import { type HttpController } from '../_lib/core/http'
import { type AppConfig } from '../_lib/core/config'

export interface InitAppDependencies {
  db: Db
  config: AppConfig
  controllers: HttpController[]
}

export const initApp = (deps: InitAppDependencies): void => {
  const userModule = new UserModule(deps)
  const userModuleProviders = userModule.init()

  deps.controllers.push(...userModuleProviders.controllers)
}
