import { UserModule } from './user/user.module'
import { type AppDependencies } from '../_lib/core/di'
import { ToDoModule } from './to-do/to-do.module'

export const initApp = (deps: AppDependencies): void => {
  const userModule = new UserModule(deps)
  const toDoModule = new ToDoModule(deps)
  const userModuleProviders = userModule.init()
  const toDoModuleProviders = toDoModule.init()

  deps.controllers = [...userModuleProviders.controllers, ...toDoModuleProviders.controllers]
}
