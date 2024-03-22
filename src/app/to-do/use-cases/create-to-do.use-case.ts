import { toEntityId, toValue } from '../../../_lib/core/entityId'
import {
  type CreateToDoInput,
  type CreateToDoOutput,
  type CreateToDoUseCase
} from '../ports/use-cases'
import { type TodoRepository } from '../ports/repositories/to-do.repository'
import { ToDo } from '../domain'

export class CreateUserUseCaseImpl implements CreateToDoUseCase {
  constructor (private readonly todoRepository: TodoRepository) {}

  async execute (input: CreateToDoInput): Promise<CreateToDoOutput> {
    const { data } = input

    const ownerId = toEntityId(data.ownerId)
    const id = await this.todoRepository.getNextId()
    const toDo = ToDo.create(id, {
      title: data.title,
      description: data.description,
      ownerId
    })

    await this.todoRepository.save(toDo)

    return {
      result: {
        id: toValue(toDo.id)
      }
    }
  }
}
