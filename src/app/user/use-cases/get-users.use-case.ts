import { toValue } from '../../../_lib/core/entityId'
import { type BasicUserRepository } from '../ports/repositories/user.repository'
import {
  type GetUsersInput,
  type GetUsersOutput,
  type GetUsersUseCase
} from '../ports/use-cases'

export class GetUsersUseCaseImpl implements GetUsersUseCase {
  constructor (private readonly userRepository: BasicUserRepository) {}

  async execute (input: GetUsersInput): Promise<GetUsersOutput> {
    const { limit, order, page, orderBy } = input.data

    const result = await this.userRepository.getAll({
      limit,
      order,
      page,
      orderBy
    })

    return {
      result: {
        page: result.pagination.page,
        count: result.pagination.count,
        maxPage: result.pagination.maxPage,
        data: result.data.map((user) => ({
          id: toValue(user.id),
          firstName: user.props.firstName,
          lastName: user.props.lastName,
          email: user.props.email
        }))
      }
    }
  }
}
