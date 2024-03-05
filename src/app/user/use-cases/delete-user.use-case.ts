import { toEntityId, toValue } from "../../../_lib/core/entityId";
import { UserRepository } from "../ports/repositories/user.repository";
import {
  DeleteUserInput,
  DeleteUserOutput,
  DeleteUserUseCase,
} from "../ports/use-cases/delete-user.use-case";
import { USER_EXCEPTIONS } from "./exceptions";

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const { data } = input;
    const userId = toEntityId(data.id);

    const user = await this.userRepository.get(userId);
    if (!user) {
      return USER_EXCEPTIONS.USER_NOT_FOUND;
    }

    await this.userRepository.delete(userId);

    return {
      result: {
        id: toValue(user.id),
      },
    };
  }
}
