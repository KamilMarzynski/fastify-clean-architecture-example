import { UserRepository } from "../ports/repositories/user.repository";
import { toValue, toEntityId } from "../../../_lib/core/entityId";
import { USER_EXCEPTIONS } from "./exceptions";
import {
  FindUserByIdUserUseCase,
  FindUserByIdUserInput,
  FindUserByIdUserOutput,
} from "../ports/use-cases/find-user-by-id.use-case";

export class FindUserByIdUserUseCaseImpl implements FindUserByIdUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: FindUserByIdUserInput): Promise<FindUserByIdUserOutput> {
    const { data } = input;
    const userId = toEntityId(data.id);

    const user = await this.userRepository.get(userId);
    if (!user) {
      return USER_EXCEPTIONS.USER_NOT_FOUND;
    }

    return {
      result: {
        id: toValue(user.id),
        firstName: user.props.firstName,
        lastName: user.props.lastName,
        email: user.props.email,
      },
    };
  }
}
