import { type UseCaseExceptionOutput } from '../../../_lib/core'

export const TO_DO_EXCEPTIONS: Record<string, UseCaseExceptionOutput> = {
  USER_NOT_FOUND: {
    code: 'TO_DO_001',
    message: 'User not found'
  }
} as const
