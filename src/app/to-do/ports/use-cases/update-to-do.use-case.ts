import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type UpdateToDoInput = UseCaseInput<Partial<{
  title: string
  description: string
}>>

export type UpdateToDoOutput = UseCaseOutput<{
  id: string
}>

export type UpdateToDoUseCase = UseCase<UpdateToDoInput, UpdateToDoOutput>
