import { UserRepository } from "../ports/repositories/user.repository";
import { User } from "../../../_lib/_sharedKernel";
import { toValue, toEntityId } from "../../../_lib/core/entityId";
import { USER_EXCEPTIONS } from "./exceptions";
import { FindUserByIdUserUseCase, FindUserByIdUserInput, FindUserByIdUserOutput } from "../ports/use-cases/find-user-by-id.use-case";
import { DeleteUserInput, DeleteUserOutput, DeleteUserUseCase } from "../ports/use-cases/delete-user.use-case";

export class DeleteUserUseCaseImpl implements DeleteUserUseCase {

    constructor(private readonly userRepository: UserRepository) {
    }

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
            }
        }

    }
}