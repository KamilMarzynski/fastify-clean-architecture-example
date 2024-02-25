import { FastifyInstance } from 'fastify'
import { LocalUserRepository } from './adapters/db/repositories/local/user.repository';
import { CreateUserUseCaseImpl } from './use-cases/create-user.use-case';
import { HttpUserController } from './adapters/http/controllers/user.controller';
import { UserRouter } from './adapters/http/routers/user.router';
import { FindUserByIdUserUseCaseImpl } from './use-cases/find-user-by-id.use-case';

// TODO: should user module know about fastify?
// should user module know about the database implementation?
// maybe I should only inject those to user module and instatiate them higher?
export class UserModule {
    constructor(private readonly server: FastifyInstance) {}

    init() {
        // DB adapters
        const userRepository = new LocalUserRepository();

        // Application use cases
        const createUser = new CreateUserUseCaseImpl(userRepository);
        const findUserByIdUseCase = new FindUserByIdUserUseCaseImpl(userRepository);

        // HTTP adapters
        const userController = new HttpUserController({
            createUserUseCase: createUser,
            findUserByIdUseCase: findUserByIdUseCase
        });

        // TODO: maybe user module shoud export controllers
        // so that app module can register them
        // router is tightly bound to the server
        // but controller is not
        const userRouter = new UserRouter(userController, this.server);

        userRouter.register();
    }
}