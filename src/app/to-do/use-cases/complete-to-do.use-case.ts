import { toEntityId, toValue } from '../../../_lib/core/entityId'
import { type ToDoRepository } from '../ports/repositories/to-do.repository'
import {
  type CompleteToDoInput,
  type CompleteToDoOutput,
  type CompleteToDoUseCase
} from '../ports/use-cases'
import { TO_DO_EXCEPTIONS } from './exceptions'

export class CompleteToDoUseCaseImpl implements CompleteToDoUseCase {
  constructor (private readonly todoRepository: ToDoRepository) {}

  async execute (input: CompleteToDoInput): Promise<CompleteToDoOutput> {
    const { data } = input

    const toDo = await this.todoRepository.get(toEntityId(data.id))
    if (toDo === null) {
      return TO_DO_EXCEPTIONS.TODO_NOT_FOUND
    }

    await this.todoRepository.save(toDo.complete())

    return {
      result: {
        id: toValue(toDo.id)
      }
    }
  }
}
