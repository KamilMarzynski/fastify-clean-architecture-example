import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type CompleteToDoInput = UseCaseInput<{
  id: string
}>

export type CompleteToDoOutput = UseCaseOutput<{
  id: string
}>

export type CompleteToDoUseCase = UseCase<CompleteToDoInput, CompleteToDoOutput>
