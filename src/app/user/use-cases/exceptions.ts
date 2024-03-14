import { type UseCaseExceptionOutput } from '../../../_lib/core'

export const USER_EXCEPTIONS: Record<string, UseCaseExceptionOutput> = {
  USER_ALREADY_EXISTS: {
    code: 'USER_001',
    message: 'User already exists'
  },
  USER_NOT_FOUND: {
    code: 'USER_002',
    message: 'User not found'
  },
  EMAIL_TAKEN: {
    code: 'USER_003',
    message: 'Email already taken'
  }
} as const
