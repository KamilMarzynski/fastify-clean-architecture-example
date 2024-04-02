import { toEntityId, toValue } from '../../../_lib/core/entityId'
import { type BasicUserRepository } from '../ports/repositories/user.repository'
import {
  type DeleteUserInput,
  type DeleteUserOutput,
  type DeleteUserUseCase
} from '../ports/use-cases'
import { USER_EXCEPTIONS } from './exceptions'

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
  constructor (private readonly userRepository: BasicUserRepository) {}

  async execute (input: DeleteUserInput): Promise<DeleteUserOutput> {
    const { data } = input
    const userId = toEntityId(data.id)

    const user = await this.userRepository.get(userId)
    if (user === null) {
      return USER_EXCEPTIONS.USER_NOT_FOUND
    }

    await this.userRepository.delete(userId)

    return {
      result: {
        id: toValue(user.id)
      }
    }
  }
}
