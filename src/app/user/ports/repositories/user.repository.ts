import { type User } from '../../../../_lib/_sharedKernel'
import { type Repository } from '../../../../_lib/core'
import { type CreateUserRepository } from './create-user.repository'
import { type UpdateUserRepository } from './update-user.repository'

export type BasicUserRepository = Repository<User>
export type UserRepository = BasicUserRepository & CreateUserRepository & UpdateUserRepository
