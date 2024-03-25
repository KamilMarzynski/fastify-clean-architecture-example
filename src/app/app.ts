import { UserModule } from './user/user.module'
import { type AppDependencies } from '../_lib/core/di'

export const initApp = (deps: AppDependencies): void => {
  const userModule = new UserModule(deps)
  const userModuleProviders = userModule.init()

  deps.controllers = [...userModuleProviders.controllers]
}
