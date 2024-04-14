import { type ToDoController, type ToDoControllerDependencies } from '../../../to-do/ports/controllers/to-do.controller'
import { type ToDoControllerFactory } from '../../../to-do/ports/controllers/to-do.controller.factory'
import { type UserController, type UserControllerDependencies } from '../../../user/ports/controllers/user.controller'
import { type UserControllerFactory } from '../../../user/ports/controllers/user.controller.factory'

export abstract class ApplicationControllerFactory implements UserControllerFactory, ToDoControllerFactory {
  public abstract createUserController (deps: UserControllerDependencies): UserController
  public abstract createToDoController (deps: ToDoControllerDependencies): ToDoController
}
