import { type UserControllerDependencies, type UserController } from './user.controller'

export abstract class UserControllerFactory {
  public abstract createUserController (deps: UserControllerDependencies): UserController
}
