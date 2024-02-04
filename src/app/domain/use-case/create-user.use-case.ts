import { UseCase } from "../../../libs/core"

export type CreateUserUseCase = UseCase<{
    firstName: string,
    lastName: string,
    email: string
}, string>
