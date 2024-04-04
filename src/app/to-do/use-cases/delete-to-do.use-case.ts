import { type UserApi } from '../../../_lib/_sharedKernel/user/ports'
import { toEntityId, toValue } from '../../../_lib/core/entityId'
import { type ToDoRepository } from '../ports/repositories/to-do.repository'
import {
  type DeleteToDoInput,
  type DeleteToDoOutput,
  type DeleteToDoUseCase
} from '../ports/use-cases'
import { TO_DO_EXCEPTIONS } from './exceptions'

export class DeleteToDoUseCaseImpl implements DeleteToDoUseCase {
  constructor (private readonly todoRepository: ToDoRepository, private readonly userApi: UserApi) {}

  async execute (input: DeleteToDoInput): Promise<DeleteToDoOutput> {
    const { data } = input

    const toDo = await this.todoRepository.get(toEntityId(data.id))
    if (toDo === null) {
      return TO_DO_EXCEPTIONS.TODO_NOT_FOUND
    }

    await this.todoRepository.delete(toDo.id)

    return {
      result: {
        id: toValue(toDo.id)
      }
    }
  }
}
