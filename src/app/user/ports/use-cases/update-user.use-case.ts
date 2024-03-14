import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type UpdateUserInput = UseCaseInput<{
  id: string
  data: {
    firstName?: string
    lastName?: string
    email?: string
  }
}>

export type UpdateUserOutput = UseCaseOutput<{
  id: string
}>

export type UpdateUserUseCase = UseCase<UpdateUserInput, UpdateUserOutput>
