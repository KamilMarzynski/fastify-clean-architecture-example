import { type Db } from 'mongodb'
import { MongoToDoRepository } from './to-do/adapters/db/repositories/mongo/to-do.repository'
import { type ToDoRepository } from './to-do/ports/repositories/to-do.repository'
import { type ToDoRepositoryFactory } from './to-do/ports/repositories/to-do.repository.factory'
import { MongoUserRepository } from './user/adapters/db/repositories/mongo/user.repository'
import { type UserRepository } from './user/ports/repositories/user.repository'
import { type UserRepositoryFactory } from './user/ports/repositories/user.repository.factory'
import { LocalUserRepository } from './user/adapters/db/repositories/local/user.repository'
import { LocalToDoRepository } from './to-do/adapters/db/repositories/local/to-do.repository'

export abstract class ApplicationRepositoryFactory implements UserRepositoryFactory, ToDoRepositoryFactory {
  public abstract createUserRepository (): UserRepository
  public abstract createToDoRepository (): ToDoRepository
}

export class MongoApplicationRepositoryFactory implements ApplicationRepositoryFactory {
  constructor (private readonly db: Db) {}
  public createUserRepository (): UserRepository {
    return new MongoUserRepository(this.db)
  }

  public createToDoRepository (): ToDoRepository {
    return new MongoToDoRepository(this.db)
  }
}

export class LocalApplicationRepositoryFactory implements ApplicationRepositoryFactory {
  public createUserRepository (): UserRepository {
    return new LocalUserRepository()
  }

  public createToDoRepository (): ToDoRepository {
    return new LocalToDoRepository()
  }
}
