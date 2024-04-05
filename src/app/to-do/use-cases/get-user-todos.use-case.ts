import { type UserApi } from '../../../_lib/_sharedKernel/user/ports'
import { toEntityId, toValue } from '../../../_lib/core/entityId'
import { type ToDoRepository } from '../ports/repositories/to-do.repository'
import {
  type GetUserToDosInput,
  type GetUserToDosUseCase,
  type GetUserToDosOutput
} from '../ports/use-cases'
import { TO_DO_EXCEPTIONS } from './exceptions'

export class GetUserToDosUseCaseImpl implements GetUserToDosUseCase {
  constructor (private readonly todoRepository: ToDoRepository, private readonly userApi: UserApi) {}

  async execute (input: GetUserToDosInput): Promise<GetUserToDosOutput> {
    const { data } = input

    const owner = await this.userApi.getUserById(toEntityId(data.ownerId))

    if (owner === null) {
      return TO_DO_EXCEPTIONS.OWNER_NOT_FOUND
    }

    const toDos = await this.todoRepository.getAll({
      limit: 100,
      filter: {
        ownerId: owner.id
      }
    })

    return {
      result: {
        data: toDos.data.map(toDo => {
          return {
            id: toValue(toDo.id),
            title: toDo.props.title,
            description: toDo.props.description,
            completed: toDo.props.isCompleted
          }
        })
      }
    }
  }
}
