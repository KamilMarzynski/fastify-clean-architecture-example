import { UseCase } from "../../../_lib/core"

export type CreateUserUseCase = UseCase<{
    firstName: string,
    lastName: string,
    email: string
}, string>
