import { HttpToDoController } from '../../../to-do/adapters/controllers/http/to-do.controller'
import { type ToDoController, type ToDoControllerDependencies } from '../../../to-do/ports/controllers/to-do.controller'
import { HttpUserController } from '../../../user/adapters/controllers/http/user.controller'
import { type UserController, type UserControllerDependencies } from '../../../user/ports/controllers/user.controller'
import { type ApplicationControllerFactory } from './application-controller.factory'

export class HttpApplicationControllerFactory implements ApplicationControllerFactory {
  public createUserController (deps: UserControllerDependencies): UserController {
    return new HttpUserController(deps)
  }

  public createToDoController (deps: ToDoControllerDependencies): ToDoController {
    return new HttpToDoController(deps)
  }
}
