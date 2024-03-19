import { type FastifyInstance } from 'fastify'
import { LocalUserRepository } from './adapters/db/repositories/local/user.repository'
import { HttpUserController } from './adapters/http/controllers/user.controller'
import { UserRouter } from './adapters/http/routers/user.router'
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
  server: FastifyInstance
  db: Db
  config: AppConfig
}

export class UserModule {
  constructor (private readonly deps: UserModuleDependencies) {}

  init (): void {
    const { server } = this.deps
    // Driven adapters
    const userRepository = new LocalUserRepository()

    // Application
    const createUser = new CreateUserUseCaseImpl(userRepository)
    const findUserById = new FindUserByIdUserUseCaseImpl(userRepository)
    const deleteUser = new DeleteUserUseCaseImpl(userRepository)
    const getUsers = new GetUsersUseCaseImpl(userRepository)
    const updateUser = new UpdateUserUseCaseImpl(userRepository)

    // Driving adapters
    const userController = new HttpUserController({
      createUserUseCase: createUser,
      findUserByIdUseCase: findUserById,
      deleteUserUseCase: deleteUser,
      getUsersUseCase: getUsers,
      updateUserUseCase: updateUser
    })
    const userRouter = new UserRouter(userController, server)

    userRouter.register()
  }
}
