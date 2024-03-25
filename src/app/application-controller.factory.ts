import { HttpUserController } from './user/adapters/controllers/http/user.controller'
import { type UserControllerFactory } from './user/ports/controllers/user.controller.factory'
import { type UserControllerDependencies, type UserController } from './user/ports/controllers/user.controller'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class ApplicationControllerFactory implements UserControllerFactory {
  public abstract createUserController (deps: UserControllerDependencies): UserController
}

export class HttpApplicationControllerFactory implements ApplicationControllerFactory {
  createUserController (deps: UserControllerDependencies): HttpUserController {
    return new HttpUserController(deps)
  }
}

// export class WSApplicationControllerFactory implements ApplicationControllerFactory {
//   createUserController (deps: UserControllerDependencies): WSUserController {
//     return new WSUserController(deps)
//   }
// }
