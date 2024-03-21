import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type DeleteToDoInput = UseCaseInput<{
  id: string
}>

export type DeleteToDoOutput = UseCaseOutput<{
  id: string
}>

export type DeleteToDoUseCase = UseCase<DeleteToDoInput, DeleteToDoOutput>
