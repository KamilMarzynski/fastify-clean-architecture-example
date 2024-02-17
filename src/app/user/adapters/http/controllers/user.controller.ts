import Joi from "joi";

import { Request, Response } from "../../../../../_lib/core/http";
import { CreateUserInput, CreateUserUseCase } from "../../../ports/use-cases/create-user.use-case";

const createUserDataSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
});

export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {
    }

    async createUser(req: Request, res: Response) {
        const data = await this.validate(req, res, createUserDataSchema);

        const input: CreateUserInput = {
            data,
            context: {
                foo: 'bar'
            }
        }
        const userId = await this.createUserUseCase.execute(input);
        return res.send({
            userId
        });
    }

    private async validate(req: Request, res: Response, schema: Joi.ObjectSchema): Promise<any> {
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                error: validationResult.error.details[0].message
            });
        }

        return validationResult.value;
    }
}