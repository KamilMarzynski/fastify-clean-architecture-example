import { Request, Response } from "../../../../../_lib/core/http";

import { CreateUserUseCase } from "../../../ports/use-cases/create-user.use-case";

export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {
    }

    async createUser(req: Request, res: Response) {
        const input = {
            data: req.body
        }
        const userId = await this.createUserUseCase.execute(input);
        return res.send({
            userId
        });
    }
}