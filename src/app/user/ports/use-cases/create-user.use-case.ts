import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type CreateUserInput = UseCaseInput<{
  firstName: string
  lastName: string
  email: string
}>

export type CreateUserOutput = UseCaseOutput<{
  id: string
}>

export type CreateUserUseCase = UseCase<CreateUserInput, CreateUserOutput>
