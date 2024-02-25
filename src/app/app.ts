import { FastifyInstance } from "fastify";
import { UserModule } from "./user/user.module";

type AppDependencies = {
    server: FastifyInstance
}

export const initApp = (deps: AppDependencies) => {
    const userModule = new UserModule(deps);
    userModule.init();
};