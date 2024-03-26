import { toEntityId, toValue } from '../../../_lib/core/entityId'
import {
  type CreateToDoInput,
  type CreateToDoOutput,
  type CreateToDoUseCase
} from '../ports/use-cases'
import { type TodoRepository } from '../ports/repositories/to-do.repository'
import { ToDo } from '../domain'
import { type UserApi } from '../../../_lib/_sharedKernel/user/ports'
import { TO_DO_EXEPCTIONS } from './exceptions'

export class CreateUserUseCaseImpl implements CreateToDoUseCase {
  constructor (private readonly todoRepository: TodoRepository, private readonly userApi: UserApi) {}

  async execute (input: CreateToDoInput): Promise<CreateToDoOutput> {
    const { data } = input

    const ownerId = toEntityId(data.ownerId)
    const owner = await this.userApi.getUserById(ownerId)
    if (owner === null) {
      return TO_DO_EXEPCTIONS.USER_NOT_FOUND
    }

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
