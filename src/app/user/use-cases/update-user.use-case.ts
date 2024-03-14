import { toEntityId } from '../../../_lib/core/entityId'
import { type UserRepository } from '../ports/repositories/user.repository'
import {
  type UpdateUserInput,
  type UpdateUserOutput,
  type UpdateUserUseCase
} from '../ports/use-cases/update-user.use-case'
import { USER_EXCEPTIONS } from './exceptions'

export class UpdateUserUseCaseImpl implements UpdateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (input: UpdateUserInput): Promise<UpdateUserOutput> {
    const { id, data } = input.data

    const userId = toEntityId(id)
    const user = await this.userRepository.get(userId)

    if (user === null) {
      return USER_EXCEPTIONS.USER_NOT_FOUND
    }

    if (data.email !== undefined) {
      const userExists = await this.userRepository.findByEmail(data.email)
      if (userExists !== null) {
        return USER_EXCEPTIONS.EMAIL_TAKEN
      }
    }

    const updatedUser = user.update(data)

    await this.userRepository.save(updatedUser)

    return {
      result: {
        id
      }
    }
  }
}
