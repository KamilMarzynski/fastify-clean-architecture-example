import { type Controller } from '../../../../_lib/core'
import { type CreateUserUseCase, type FindUserByIdUserUseCase, type DeleteUserUseCase, type GetUsersUseCase, type UpdateUserUseCase } from '../use-cases'

export interface UserControllerDependencies {
  createUserUseCase: CreateUserUseCase
  findUserByIdUseCase: FindUserByIdUserUseCase
  deleteUserUseCase: DeleteUserUseCase
  getUsersUseCase: GetUsersUseCase
  updateUserUseCase: UpdateUserUseCase
}

export interface UserController extends Controller {
  createUser: (...args: any[]) => Promise<any>
  findUserById: (...args: any[]) => Promise<any>
  getUsers: (...args: any[]) => Promise<any>
  deleteUser: (...args: any[]) => Promise<any>
  updateUser: (...args: any[]) => Promise<any>
}
