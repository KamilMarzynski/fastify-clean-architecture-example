import {
  CreateUserUseCaseImpl,
  DeleteUserUseCaseImpl,
  FindUserByIdUserUseCaseImpl,
  GetUsersUseCaseImpl,
  UpdateUserUseCaseImpl
} from './use-cases'
import { type AppConfig } from '../../_lib/core/config'
import { type Controller } from '../../_lib/core/controller'
import { type UserControllerFactory } from './ports/controllers/user.controller.factory'
import { type UserRepositoryFactory } from './ports/repositories/user.repository.factory'

interface UserModuleDependencies {
  config: AppConfig
  controllerFactory: UserControllerFactory
  repositoryFactory: UserRepositoryFactory
}

interface UserModuleProviders {
  controllers: Controller[]
}

export class UserModule {
  constructor (private readonly deps: UserModuleDependencies) {}

  init (): UserModuleProviders {
    // Driven adapters
    const userRepository = this.deps.repositoryFactory.createUserRepository()

    // Application
    const createUserUseCase = new CreateUserUseCaseImpl(userRepository)
    const findUserByIdUseCase = new FindUserByIdUserUseCaseImpl(userRepository)
    const deleteUserUseCase = new DeleteUserUseCaseImpl(userRepository)
    const getUsersUseCase = new GetUsersUseCaseImpl(userRepository)
    const updateUserUseCase = new UpdateUserUseCaseImpl(userRepository)

    // Driving adapters
    const userController = this.deps.controllerFactory.createUserController({
      createUserUseCase,
      findUserByIdUseCase,
      deleteUserUseCase,
      getUsersUseCase,
      updateUserUseCase
    })

    return {
      controllers: [userController]
    }
  }
}
