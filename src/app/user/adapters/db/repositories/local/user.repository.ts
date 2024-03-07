import { type QueryOptions, type PaginatedResult } from '../../../../../../_lib/core'
import { type User, type UserId } from '../../../../../../_lib/_sharedKernel'
import { type UserRepository } from '../../../../ports/repositories/user.repository'

export class LocalUserRepository implements UserRepository {
  private users: User[] = []

  async findByEmail (email: string): Promise<User | null> {
    return this.users.find((u: User) => u.props.email === email) ?? null
  }

  async getNextId (): Promise<UserId> {
    return {
      value: (this.users.length + 1).toString()
    }
  }

  async get (id: UserId): Promise<User | null> {
    return this.users.find((u: User) => u.id === id) ?? null
  }

  async getAll (query: QueryOptions<User>): Promise<PaginatedResult<User>> {
    return {
      data: this.users,
      pagination: {
        page: 1,
        count: this.users.length,
        maxPage: 1
      }
    }
  }

  async save (entity: User): Promise<User> {
    this.users.push(entity)
    return entity
  }

  async delete (id: UserId): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id)
  }
}
