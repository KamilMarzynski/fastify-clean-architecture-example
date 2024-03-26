import { HttpUserController } from './user/adapters/controllers/http/user.controller'
import { type UserControllerFactory } from './user/ports/controllers/user.controller.factory'
import { type UserControllerDependencies, type UserController } from './user/ports/controllers/user.controller'
import { type ToDoControllerFactory } from './to-do/ports/controllers/to-do.controller.factory'
import { type ToDoController, type ToDoControllerDependencies } from './to-do/ports/controllers/to-do.controller'
import { HttpToDoController } from './to-do/adapters/controllers/http/to-do.controller'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class ApplicationControllerFactory implements UserControllerFactory, ToDoControllerFactory {
  public abstract createUserController (deps: UserControllerDependencies): UserController
  public abstract createToDoController (deps: ToDoControllerDependencies): ToDoController
}

export class HttpApplicationControllerFactory implements ApplicationControllerFactory {
  createUserController (deps: UserControllerDependencies): HttpUserController {
    return new HttpUserController(deps)
  }

  public createToDoController (deps: ToDoControllerDependencies): HttpToDoController {
    return new HttpToDoController(deps)
  }
}

// export class WSApplicationControllerFactory implements ApplicationControllerFactory {
//   createUserController (deps: UserControllerDependencies): WSUserController {
//     return new WSUserController(deps)
//   }
// }
