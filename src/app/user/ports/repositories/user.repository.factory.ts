import { type UserRepository } from './user.repository'

export abstract class UserRepositoryFactory {
  public abstract createUserRepository (): UserRepository
}
