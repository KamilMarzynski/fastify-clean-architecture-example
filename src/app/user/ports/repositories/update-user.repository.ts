import { type User } from '../../../../_lib/_sharedKernel'
import { type BasicUserRepository } from './user.repository'

// this approach allows us to create use case specific methods that are not available (thanks to TypeScript) in the generic repository, and therefore not in other use cases
export type UpdateUserRepository = BasicUserRepository & {
  findByEmail: (email: string) => Promise<User | null>
}
