import { UseCaseExceptionOutput } from "../../../_lib/core";

export const USER_EXCEPTIONS: Record<string, UseCaseExceptionOutput> = {
    USER_ALREADY_EXISTS: {
        code: 'USER_001',
        message: 'User already exists'
    }
} as const;