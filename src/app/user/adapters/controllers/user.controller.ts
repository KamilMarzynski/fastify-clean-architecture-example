import { CreateUserUseCase } from "../../types/use-cases/create-user.use-case";

export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    createUser(req: any, res: any) {
        const userId = this.createUserUseCase.execute(req.body);

        return res.send({
            userId
        });
    }
}