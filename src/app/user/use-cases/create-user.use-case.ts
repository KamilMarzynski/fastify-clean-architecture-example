import { CreateUserInput, CreateUserOutput, CreateUserUseCase } from "../ports/use-cases/create-user.use-case";
import { UserRepository } from "../ports/user.repository";
import { User } from "../../../_lib/common/user/domain/user.entity";

export class CreateUserUseCaseImpl implements CreateUserUseCase {

    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const { payload } = input;
        const id = await this.userRepository.getNextId();
        const user = new User(id, {firstName: payload.firstName, lastName: payload.lastName, email: payload.email });

        await this.userRepository.save(user);

        return {
            result: {
                id: user.id
            }
        }
    }
}