import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type CreateToDoInput = UseCaseInput<{
  title: string
  description: string
  ownerId: string
}>

export type CreateToDoOutput = UseCaseOutput<{
  id: string
}>

export type CreateToDoUseCase = UseCase<CreateToDoInput, CreateToDoOutput>
