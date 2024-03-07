import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type FindUserByIdUserInput = UseCaseInput<{
  id: string
}>

export type FindUserByIdUserOutput = UseCaseOutput<{
  id: string
  firstName: string
  lastName: string
  email: string
}>

export type FindUserByIdUserUseCase = UseCase<
FindUserByIdUserInput,
FindUserByIdUserOutput
>
