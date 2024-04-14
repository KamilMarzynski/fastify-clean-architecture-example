import { type Db } from 'mongodb'
import { MongoToDoRepository } from '../../../to-do/adapters/db/repositories/mongo/to-do.repository'
import { type ToDoRepository } from '../../../to-do/ports/repositories/to-do.repository'
import { MongoUserRepository } from '../../../user/adapters/db/repositories/mongo/user.repository'
import { type UserRepository } from '../../../user/ports/repositories/user.repository'
import { type ApplicationRepositoryFactory } from './application-repository.factory'

export class MongoApplicationRepositoryFactory implements ApplicationRepositoryFactory {
  constructor (private readonly db: Db) {}
  public createUserRepository (): UserRepository {
    return new MongoUserRepository(this.db)
  }

  public createToDoRepository (): ToDoRepository {
    return new MongoToDoRepository(this.db)
  }
}
