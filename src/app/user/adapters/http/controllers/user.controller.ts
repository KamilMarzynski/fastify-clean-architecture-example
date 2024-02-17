import { Request, Response } from "../../../../../_lib/core/http";

import { CreateUserUseCase } from "../../../ports/use-cases/create-user.use-case";

export class HttpUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {
    }

    async createUser(req: Request, res: Response) {
        const input = {
            data: req.body
        }
        const output = await this.createUserUseCase.execute(input);

        if ('code' in output) {
            // TODO: add custom domain errors and handle them here
            return res.status(500).send(output.message);
        }

        return res.send({
            userId: output.result.id
        });
    }
}