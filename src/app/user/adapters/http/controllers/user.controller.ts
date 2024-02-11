import { CreateUserUseCase } from "../../../ports/use-cases/create-user.use-case";

export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {
    }

    async createUser(req: any, res: any) {
        const input = {
            data: req.body
        }
        const userId = await this.createUserUseCase.execute(input);
        return res.send({
            userId
        });
    }
}