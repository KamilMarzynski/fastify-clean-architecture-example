import { HttpUserController } from "../controllers/user.controller";
import { FastifyInstance } from "fastify";

const userByIdParams = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'string' }
    }
}

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

const findUserByIdSchema = {
    params: userByIdParams
}

const deleteUserSchema = {
    params: userByIdParams
}


export class UserRouter {
    constructor(private readonly userController: HttpUserController, private readonly server: FastifyInstance) { }

    public register() {
        this.server.get('/users/:id', { schema: findUserByIdSchema }, (req, res) => this.userController.findUserById(req, res));
        this.server.delete('/users/:id', { schema: deleteUserSchema }, (req, res) => this.userController.deleteUser(req, res));
        this.server.post('/users', {
            schema: createUserSchema
        }, (req, res) => this.userController.createUser(req, res));
    }
}