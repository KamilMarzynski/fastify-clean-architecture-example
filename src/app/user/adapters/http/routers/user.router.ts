import { HttpUserController } from "../controllers/user.controller";
import { FastifyInstance } from "fastify";

const createUserSchema = {
    body: {
        type: 'object',
        required: ['firstName', 'lastName', 'email'],
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' }
        }
    }

}

export class UserRouter {
    constructor(private readonly userController: HttpUserController, private readonly server: FastifyInstance) { }

    public register() {
        this.server.post('/users', {
            schema: createUserSchema
        }, (req, res) => this.userController.createUser(req, res));
    }
}