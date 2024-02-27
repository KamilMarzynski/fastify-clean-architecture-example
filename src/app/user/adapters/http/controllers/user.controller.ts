import { Request, Response } from "../../../../../_lib/core/http";
import { isUseCaseError } from "../../../../../_lib/core/use-case";

import { CreateUserUseCase } from "../../../ports/use-cases/create-user.use-case";
import { DeleteUserUseCase } from "../../../ports/use-cases/delete-user.use-case";
import { FindUserByIdUserUseCase } from "../../../ports/use-cases/find-user-by-id.use-case";
import { USER_EXCEPTIONS } from "../../../use-cases/exceptions";

export type HttpUserControllerDependencies = {
    createUserUseCase: CreateUserUseCase,
    findUserByIdUseCase: FindUserByIdUserUseCase
    deleteUserUseCase: DeleteUserUseCase
}

export class HttpUserController {
    private createUserUseCase: CreateUserUseCase;
    private findUserByIdUseCase: FindUserByIdUserUseCase;
    private deleteUserUseCase: DeleteUserUseCase;
    
    constructor(deps: HttpUserControllerDependencies) {
        this.createUserUseCase = deps.createUserUseCase;
        this.findUserByIdUseCase = deps.findUserByIdUseCase;
        this.deleteUserUseCase = deps.deleteUserUseCase;
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

    async findUserById(req: Request, res: Response) {
        try {
        const input = {
            data: req.params
        }
        const output = await this.findUserByIdUseCase.execute(input);

        if (isUseCaseError(output)) {
            if (output.code === USER_EXCEPTIONS.USER_NOT_FOUND.code) {
                return res.status(404).send(output.message);
            }
            return res.status(500).send(output.message);
        }

        return res.send(output.result);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
    
    async deleteUser(req: Request, res: Response) {
        try {
            const input = {
                data: req.params
            }
            const output = await this.deleteUserUseCase.execute(input);
            
            if (isUseCaseError(output)) {
                if (output.code === USER_EXCEPTIONS.USER_NOT_FOUND.code) {
                    return res.status(404).send(output.message);
                }
                return res.status(500).send(output.message);
            }

            return res.send(output.result);
        } catch (error: any) {
            return res.status(500).send(error.message);
        }
    }
}