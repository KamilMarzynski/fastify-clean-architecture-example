import { LocalToDoRepository } from '../../../to-do/adapters/db/repositories/local/to-do.repository'
import { type ToDoRepository } from '../../../to-do/ports/repositories/to-do.repository'
import { LocalUserRepository } from '../../../user/adapters/db/repositories/local/user.repository'
import { type UserRepository } from '../../../user/ports/repositories/user.repository'
import { type ApplicationRepositoryFactory } from './application-repository.factory'

export class LocalApplicationRepositoryFactory implements ApplicationRepositoryFactory {
  public createUserRepository (): UserRepository {
    return new LocalUserRepository()
  }

  public createToDoRepository (): ToDoRepository {
    return new LocalToDoRepository()
  }
}
