import { type Repository } from '../../../../_lib/core'
import { type User } from '../../../../_lib/_sharedKernel'

export type UserRepository = Repository<User> & {
  findByEmail: (email: string) => Promise<User | null>
}
