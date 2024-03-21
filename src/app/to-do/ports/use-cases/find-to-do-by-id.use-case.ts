import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type FindToDoByIdInput = UseCaseInput<{
  id: string
}>

export type FindToDoByIdOutput = UseCaseOutput<{
  id: string
}>

export type FindToDoByIdUseCase = UseCase<FindToDoByIdInput, FindToDoByIdOutput>
