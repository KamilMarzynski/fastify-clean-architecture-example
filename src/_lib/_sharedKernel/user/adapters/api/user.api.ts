import { toEntityId } from '../../../../core/entityId'
import { User, type UserId } from '../../domain'
import { UserApi } from '../../ports/api/user.api'
import { type Transport } from '../../../../core/transport'

export interface UserReadModel {
  id: string
  firstName: string
  lastName: string
  email: string
}

export class UserApiImpl extends UserApi {
  constructor (protected readonly transport: Transport) {
    super(transport)
  }

  getUserById: (id: UserId) => Promise<User | null> = async (id: UserId) => {
    const userRes = await this.transport.query<UserReadModel | string>({ id: id.value }, { route: '/users' })
    // TODO: better error handling
    if (typeof userRes === 'string') {
      return null
    }
    const userId = toEntityId(userRes.id)
    return new User(userId, {
      firstName: userRes.firstName,
      lastName: userRes.lastName,
      email: userRes.email
    })
  }
}
