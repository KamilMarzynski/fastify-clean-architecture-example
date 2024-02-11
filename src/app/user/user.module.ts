import { FastifyInstance } from 'fastify'
import { LocalUserRepositorty } from './adapters/db/repositories/local/user.repository';
import { CreateUserUseCaseImpl } from './use-cases/create-user.use-case';
import { UserController } from './adapters/http/controllers/user.controller';
import { UserRouter } from './adapters/http/routers/user.router';

export class UserModule {
    constructor(private readonly server: FastifyInstance) {}

    init() {
        const userRepository = new LocalUserRepositorty();
        const createUserUseCase = new CreateUserUseCaseImpl(userRepository);
        const userController = new UserController(createUserUseCase);
        const userRouter = new UserRouter(userController, this.server);
        userRouter.register();
    }
}