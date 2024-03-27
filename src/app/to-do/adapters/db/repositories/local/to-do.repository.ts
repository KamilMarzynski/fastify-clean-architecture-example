import { type QueryOptions, type PaginatedResult } from '../../../../../../_lib/core'
import { type UserId } from '../../../../../../_lib/_sharedKernel'
import { type ToDoRepository } from '../../../../ports/repositories/to-do.repository'
import { type ToDo } from '../../../../domain'

export class LocalToDoRepository implements ToDoRepository {
  private toDos: ToDo[] = []

  async getNextId (): Promise<UserId> {
    return {
      value: (this.toDos.length + 1).toString()
    }
  }

  async get (id: UserId): Promise<ToDo | null> {
    return this.toDos.find((u: ToDo) => u.id === id) ?? null
  }

  async getAll (query: QueryOptions<ToDo>): Promise<PaginatedResult<ToDo>> {
    return {
      data: this.toDos,
      pagination: {
        page: 1,
        count: this.toDos.length,
        maxPage: 1
      }
    }
  }

  async save (entity: ToDo): Promise<ToDo> {
    this.toDos.push(entity)
    return entity
  }

  async delete (id: UserId): Promise<void> {
    this.toDos = this.toDos.filter((u) => u.id !== id)
  }
}
