import { type UseCase, type UseCaseInput, type UseCaseOutput } from '../../../../_lib/core'

export type GetUsersInput = UseCaseInput<{
  orderBy: 'firstName' | 'lastName' | 'email'
  order: 'asc' | 'desc'
  limit: number
  page: number
}>

export type GetUsersOutput = UseCaseOutput<{
  page: number
  count: number
  maxPage: number
  data: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
  }>
}>

export type GetUsersUseCase = UseCase<GetUsersInput, GetUsersOutput>
