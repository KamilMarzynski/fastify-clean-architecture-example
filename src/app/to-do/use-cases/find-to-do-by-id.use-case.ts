import { type UserApi } from '../../../_lib/_sharedKernel/user/ports'
import { toEntityId, toValue } from '../../../_lib/core/entityId'
import { type ToDoRepository } from '../ports/repositories/to-do.repository'
import {
  type FindToDoByIdInput,
  type FindToDoByIdOutput,
  type FindToDoByIdUseCase
} from '../ports/use-cases'
import { TO_DO_EXCEPTIONS } from './exceptions'

export class FindToDoByIdUseCaseImpl implements FindToDoByIdUseCase {
  constructor (private readonly todoRepository: ToDoRepository, private readonly userApi: UserApi) {}

  async execute (input: FindToDoByIdInput): Promise<FindToDoByIdOutput> {
    const { data } = input

    const toDo = await this.todoRepository.get(toEntityId(data.id))
    if (toDo === null) {
      return TO_DO_EXCEPTIONS.TODO_NOT_FOUND
    }

    const owner = await this.userApi.getUserById(toDo.props.ownerId)

    if (owner === null) {
      return TO_DO_EXCEPTIONS.OWNER_NOT_FOUND
    }

    await this.todoRepository.save(toDo.complete())

    return {
      result: {
        id: toValue(toDo.id),
        title: toDo.props.title,
        description: toDo.props.description,
        completed: toDo.props.isCompleted,
        owner: {
          id: toValue(owner?.id),
          name: owner?.props.firstName
        }
      }
    }
  }
}
