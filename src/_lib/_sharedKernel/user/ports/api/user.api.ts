import { type UserId, type User } from '../../domain'

export interface UserApi {
  getUserById: (id: UserId) => Promise<User>
}
