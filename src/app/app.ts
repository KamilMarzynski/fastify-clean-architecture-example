import { UserModule } from "./user/user.module";

// TODO: change server to dependency container
export const initApp = (server: any) => {
    const userModule = new UserModule(server);
    userModule.init();
};