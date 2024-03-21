import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type GetUserToDosInput = UseCaseInput<{
  ownerId: string
}>

export type GetUserToDosOutput = UseCaseOutput<{
  data: Array<{
    id: string
    title: string
    description: string
    completed: boolean
  }>
}>

export type GetUserToDosUseCase = UseCase<GetUserToDosInput, GetUserToDosOutput>
