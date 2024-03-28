import {
  CreateToDoUseCaseImpl
} from './use-cases'
import { type AppConfig } from '../../_lib/core/config'
import { type Controller } from '../../_lib/core/controller'
import { type ToDoControllerFactory } from './ports/controllers/to-do.controller.factory'
import { type ToDoRepositoryFactory } from './ports/repositories/to-do.repository.factory'
import { type TransportFactory } from '../../_lib/core/transport'
import { UserApiImpl } from '../../_lib/_sharedKernel/user/adapters'

interface ToDoModuleDependencies {
  config: AppConfig
  controllerFactory: ToDoControllerFactory
  repositoryFactory: ToDoRepositoryFactory
  transportFactory: TransportFactory
}

interface ToDoModuleProviders {
  controllers: Controller[]
}

export class ToDoModule {
  constructor (private readonly deps: ToDoModuleDependencies) {}

  init (): ToDoModuleProviders {
    // Driven adapters
    const toDoRepository = this.deps.repositoryFactory.createToDoRepository()
    const userApi = new UserApiImpl(this.deps.transportFactory.create())

    // Application
    const createToDoUseCase = new CreateToDoUseCaseImpl(toDoRepository, userApi)

    // Driving adapters
    const toDoController = this.deps.controllerFactory.createToDoController({
      createToDoUseCase
    })

    return {
      controllers: [toDoController]
    }
  }
}
