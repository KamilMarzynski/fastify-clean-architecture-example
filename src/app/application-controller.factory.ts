import { HttpUserController } from './user/adapters/controllers/http/user.controller'
import { type UserControllerFactory } from './user/ports/controllers/user.controller.factory'
import { type UserControllerDependencies, type UserController } from './user/ports/controllers/user.controller'
import { type ToDoControllerFactory } from './to-do/ports/controllers/to-do.controller.factory'
import { type ToDoController, type ToDoControllerDependencies } from './to-do/ports/controllers/to-do.controller'
import { HttpToDoController } from './to-do/adapters/controllers/http/to-do.controller'

export abstract class ApplicationControllerFactory implements UserControllerFactory, ToDoControllerFactory {
  public abstract createUserController (deps: UserControllerDependencies): UserController
  public abstract createToDoController (deps: ToDoControllerDependencies): ToDoController
}

export class HttpApplicationControllerFactory implements ApplicationControllerFactory {
  public createUserController (deps: UserControllerDependencies): UserController {
    return new HttpUserController(deps)
  }

  public createToDoController (deps: ToDoControllerDependencies): ToDoController {
    return new HttpToDoController(deps)
  }
}

// example of a another controller factory
// export class WSApplicationControllerFactory implements ApplicationControllerFactory {
//   createUserController (deps: UserControllerDependencies): WSUserController {
//     return new WSUserController(deps)
//   }
//
// public createToDoController (deps: ToDoControllerDependencies): ToDoController {
//   return new WsToDoController(deps)
// }
// }
