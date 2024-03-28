import { type Transport } from '../../../../core/transport'
import { type User, type UserId } from '../../domain'

export abstract class UserApi {
  constructor (protected readonly transport: Transport) {
  }

  abstract getUserById: (id: UserId) => Promise<User | null>
}
