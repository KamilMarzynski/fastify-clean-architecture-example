import { toValue } from '../../../_lib/core/entityId'
import { User } from '../../../_lib/_sharedKernel'
import { type UserRepository } from '../ports/repositories/user.repository'
import {
  type CreateUserInput,
  type CreateUserOutput,
  type CreateUserUseCase
} from '../ports/use-cases'
import { USER_EXCEPTIONS } from './exceptions'

export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (input: CreateUserInput): Promise<CreateUserOutput> {
    const { data } = input

    const userExists = await this.userRepository.findByEmail(data.email)
    if (userExists !== null) {
      return USER_EXCEPTIONS.USER_ALREADY_EXISTS
    }

    const id = await this.userRepository.getNextId()
    const user = new User(id, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    })

    await this.userRepository.save(user)

    return {
      result: {
        id: toValue(user.id)
      }
    }
  }
}
