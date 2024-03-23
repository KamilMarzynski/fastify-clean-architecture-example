import { LocalUserRepository } from './adapters/db/repositories/local/user.repository'
import { HttpUserController } from './adapters/http/controllers/user.controller'
import {
  CreateUserUseCaseImpl,
  DeleteUserUseCaseImpl,
  FindUserByIdUserUseCaseImpl,
  GetUsersUseCaseImpl,
  UpdateUserUseCaseImpl
} from './use-cases'
import { type Db } from 'mongodb'
import { type AppConfig } from '../../_lib/core/config'

interface UserModuleDependencies {
  db: Db
  config: AppConfig
}

interface UserModuleProviders {
  controllers: HttpUserController[]
}

export class UserModule {
  constructor (private readonly deps: UserModuleDependencies) {}

  init (): UserModuleProviders {
    // Driven adapters
    const userRepository = new LocalUserRepository()

    // Application
    const createUserUseCase = new CreateUserUseCaseImpl(userRepository)
    const findUserByIdUseCase = new FindUserByIdUserUseCaseImpl(userRepository)
    const deleteUserUseCase = new DeleteUserUseCaseImpl(userRepository)
    const getUsersUseCase = new GetUsersUseCaseImpl(userRepository)
    const updateUserUseCase = new UpdateUserUseCaseImpl(userRepository)

    // Driving adapters
    const userController = new HttpUserController({
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
