import { type ToDoRepository } from '../../../to-do/ports/repositories/to-do.repository'
import { type ToDoRepositoryFactory } from '../../../to-do/ports/repositories/to-do.repository.factory'
import { type UserRepository } from '../../../user/ports/repositories/user.repository'
import { type UserRepositoryFactory } from '../../../user/ports/repositories/user.repository.factory'

export abstract class ApplicationRepositoryFactory implements UserRepositoryFactory, ToDoRepositoryFactory {
  public abstract createUserRepository (): UserRepository
  public abstract createToDoRepository (): ToDoRepository
}
