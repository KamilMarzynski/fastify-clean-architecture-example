import { UserController } from "../controllers/user.controller";
import { FastifyInstance } from "fastify";

export class UserRouter {
    constructor(private readonly userController: UserController, private readonly server: FastifyInstance) {}

    public register() {
        this.server.post('/users', (req, res) => this.userController.createUser(req, res));
    }
}