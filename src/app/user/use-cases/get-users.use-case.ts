import { toValue } from "../../../_lib/core/entityId";
import { UserRepository } from "../ports/repositories/user.repository";
import {
  GetUsersInput,
  GetUsersOutput,
  GetUsersUseCase,
} from "../ports/use-cases/get-users.use-case";

export class GetUsersUseCaseImpl implements GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUsersInput): Promise<GetUsersOutput> {
    const { limit, order, page, orderBy } = input.data;

    const result = await this.userRepository.getAll({
      limit,
      order,
      page,
      orderBy,
    });

    return {
      result: {
        page: result.pagination.page,
        count: result.pagination.count,
        maxPage: result.pagination.maxPage,
        data: result.data.map((user) => ({
          id: toValue(user.id),
          firstName: user.props.firstName,
          lastName: user.props.lastName,
          email: user.props.email,
        })),
      },
    };
  }
}
