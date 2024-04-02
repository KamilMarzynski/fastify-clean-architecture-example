import { ObjectId, type Db, type WithId, type Document } from 'mongodb'
import { type QueryOptions, type PaginatedResult } from '../../../../../../_lib/core'
import { User, type UserId } from '../../../../../../_lib/_sharedKernel'
import { type UserRepository } from '../../../../ports/repositories/user.repository'
import { toEntityId } from '../../../../../../_lib/core/entityId'
import { type CreateUserRepository } from '../../../../ports/repositories/create-user.repository'
import { type UpdateUserRepository } from '../../../../ports/repositories/update-user.repository'

const dataToEntity = (document: WithId<Document>): User => new User(toEntityId(document._id.toString()), {
  firstName: document.firstName,
  lastName: document.lastName,
  email: document.email
})

// becouse this repository is implementing both UserRepository and CreateUserRepository it will fit requirements for more generic use cases as well as for more specific use cases
export class MongoUserRepository implements UserRepository, CreateUserRepository, UpdateUserRepository {
  constructor (private readonly db: Db) {}

  async findByEmail (email: string): Promise<User | null> {
    const document = await this.db.collection('users').findOne({ email })

    if (document === null) {
      return null
    }

    return dataToEntity(document)
  }

  async getNextId (): Promise<UserId> {
    return toEntityId(new ObjectId().toString())
  }

  async get (id: UserId): Promise<User | null> {
    const document = await this.db.collection('users').findOne({ _id: new ObjectId(id.value) })

    if (document === null) {
      return null
    }

    return dataToEntity(document)
  }

  async getAll (query: QueryOptions<User>): Promise<PaginatedResult<User>> {
    const limit = query.limit ?? 10
    const page = query.page ?? 1
    const orderBy = query.orderBy ?? 'id'
    const order = query.order ?? 'asc'

    const sort = [orderBy, order]

    const data = await this.db.collection('users')
      .find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const count = await this.db.collection('users').countDocuments()

    return {
      data: data.map(dataToEntity),
      pagination: {
        page,
        count,
        maxPage: Math.ceil(count / limit)
      }
    }
  }

  async save (entity: User): Promise<User> {
    await this.db.collection('users').updateOne({ _id: new ObjectId(entity.id.value) }, {
      $set: {
        firstName: entity.props.firstName,
        lastName: entity.props.lastName,
        email: entity.props.email
      }
    }, { upsert: true })

    return entity
  }

  async delete (id: UserId): Promise<void> {
    await this.db.collection('users').deleteOne({ _id: new ObjectId(id.value) })
  }
}
