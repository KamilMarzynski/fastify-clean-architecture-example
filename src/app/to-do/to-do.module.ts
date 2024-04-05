import {
  CreateToDoUseCaseImpl
} from './use-cases'
import { type AppConfig } from '../../_lib/core/config'
import { type Controller } from '../../_lib/core/controller'
import { type ToDoControllerFactory } from './ports/controllers/to-do.controller.factory'
import { type ToDoRepositoryFactory } from './ports/repositories/to-do.repository.factory'
import { type TransportFactory } from '../../_lib/core/transport'
import { UserApiImpl } from '../../_lib/_sharedKernel/user/adapters'
import { CompleteToDoUseCaseImpl } from './use-cases/complete-to-do.use-case'
import { FindToDoByIdUseCaseImpl } from './use-cases/find-to-do-by-id.use-case'
import { DeleteToDoUseCaseImpl } from './use-cases/delete-to-do.use-case'
import { GetUserToDosUseCaseImpl } from './use-cases/get-user-todos.use-case'

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
    const completeToDoUseCase = new CompleteToDoUseCaseImpl(toDoRepository)
    const findToDoByIdUseCase = new FindToDoByIdUseCaseImpl(toDoRepository, userApi)
    const deleteToDoUseCase = new DeleteToDoUseCaseImpl(toDoRepository)
    const getUserToDosUseCase = new GetUserToDosUseCaseImpl(toDoRepository, userApi)

    // Driving adapters
    const toDoController = this.deps.controllerFactory.createToDoController({
      createToDoUseCase,
      completeToDoUseCase,
      findToDoByIdUseCase,
      deleteToDoUseCase,
      getUserToDosUseCase
    })

    return {
      controllers: [toDoController]
    }
  }
}
