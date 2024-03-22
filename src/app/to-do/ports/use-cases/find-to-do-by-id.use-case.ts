import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type FindToDoByIdInput = UseCaseInput<{
  id: string
}>

export type FindToDoByIdOutput = UseCaseOutput<{
  id: string
  title: string
  description: string
  completed: boolean
  owner: {
    id: string
    name: string
  }
}>

export type FindToDoByIdUseCase = UseCase<FindToDoByIdInput, FindToDoByIdOutput>
