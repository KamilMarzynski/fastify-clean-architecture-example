import { FastifyInstance } from 'fastify'
import { LocalUserRepository } from './adapters/db/repositories/local/user.repository';
import { CreateUserUseCaseImpl } from './use-cases/create-user.use-case';
import { HttpUserController } from './adapters/http/controllers/user.controller';
import { UserRouter } from './adapters/http/routers/user.router';

export class UserModule {
    constructor(private readonly server: FastifyInstance) {}

    init() {
        // DB adapters
        const userRepository = new LocalUserRepository();

        // Application use cases
        const createUser = new CreateUserUseCaseImpl(userRepository);

        // HTTP adapters
        const userController = new HttpUserController(createUser);
        const userRouter = new UserRouter(userController, this.server);

        userRouter.register();
    }
}