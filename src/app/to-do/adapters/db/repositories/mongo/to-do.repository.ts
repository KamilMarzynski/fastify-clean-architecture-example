import { ObjectId, type Db, type WithId, type Document } from 'mongodb'
import { type QueryOptions, type PaginatedResult } from '../../../../../../_lib/core'
import { type UserId } from '../../../../../../_lib/_sharedKernel'
import { type ToDoRepository } from '../../../../ports/repositories/to-do.repository'
import { toEntityId } from '../../../../../../_lib/core/entityId'
import { ToDo, type ToDoId } from '../../../../domain'

const dataToEntity = (document: WithId<Document>): ToDo => new ToDo(toEntityId(document._id.toString()), {
  title: document.title,
  description: document.description,
  ownerId: toEntityId(document.ownerId.toString()),
  isCompleted: document.isCompleted
})

export class MongoToDoRepository implements ToDoRepository {
  constructor (private readonly db: Db) {}

  getNextId: () => Promise<ToDoId> = async () => toEntityId(new ObjectId().toString())

  async get (id: UserId): Promise<ToDo | null> {
    const document = await this.db.collection('todos').findOne({ _id: new ObjectId(id.value) })

    if (document === null) {
      return null
    }

    return dataToEntity(document)
  }

  async getAll (query: QueryOptions<ToDo>): Promise<PaginatedResult<ToDo>> {
    const limit = query.limit ?? 10
    const page = query.page ?? 1
    const orderBy = query.orderBy ?? 'id'
    const order = query.order ?? 'asc'

    const sort = [orderBy, order]

    const data = await this.db.collection('todos')
      .find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const count = await this.db.collection('todos').countDocuments()

    return {
      data: data.map(dataToEntity),
      pagination: {
        page,
        count,
        maxPage: Math.ceil(count / limit)
      }
    }
  }

  async save (entity: ToDo): Promise<ToDo> {
    await this.db.collection('todos').updateOne({ _id: new ObjectId(entity.id.value) }, {
      $set: {
        title: entity.props.title,
        description: entity.props.description,
        ownerId: entity.props.ownerId.value,
        isCompleted: entity.props.isCompleted
      }
    }, { upsert: true })

    return entity
  }

  async delete (id: UserId): Promise<void> {
    await this.db.collection('todos').deleteOne({ _id: new ObjectId(id.value) })
  }
}
