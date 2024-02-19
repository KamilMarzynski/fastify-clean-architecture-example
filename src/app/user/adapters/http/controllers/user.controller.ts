import { Request, Response } from "../../../../../_lib/core/http";
import { isUseCaseError } from "../../../../../_lib/core/use-case";

import { CreateUserUseCase } from "../../../ports/use-cases/create-user.use-case";
import { USER_EXCEPTIONS } from "../../../use-cases/exceptions";

export class HttpUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {
    }

    async createUser(req: Request, res: Response) {
        try {
        const input = {
            data: req.body
        }
        const output = await this.createUserUseCase.execute(input);

        if (isUseCaseError(output)) {
            if (output.code === USER_EXCEPTIONS.USER_ALREADY_EXISTS.code) {
                return res.status(409).send(output.message);
            }
            return res.status(500).send(output.message);
        }

        return res.send({
            userId: output.result.id
        });
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
}