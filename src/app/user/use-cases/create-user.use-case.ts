import { CreateUserInput, CreateUserOutput, CreateUserUseCase } from "../ports/use-cases/create-user.use-case";
import { UserRepository } from "../ports/user.repository";
import { User } from "../../../_lib/_sharedKernel/user/domain/user.entity";
import { toValue } from "../../../_lib/core/entityId";

export class CreateUserUseCaseImpl implements CreateUserUseCase {

    constructor(private readonly userRepository: UserRepository) {
    }

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const { data } = input;

        const id = await this.userRepository.getNextId();
        const user = new User(id, { firstName: data.firstName, lastName: data.lastName, email: data.email });

        await this.userRepository.save(user);

        return {
            result: {
                id: toValue(user.id),
            }
        }
    }
}