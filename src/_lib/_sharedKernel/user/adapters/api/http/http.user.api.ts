import http from 'http'
import { toEntityId } from '../../../../../core/entityId'
import { User, type UserId } from '../../../domain'
import { type UserApi } from '../../../ports/api/user.api'

interface UserReadModel {
  id: string
  firstName: string
  lastName: string
  email: string
}

export class HttpUserApi implements UserApi {
  async getUserById (id: UserId): Promise<User> {
    const data = await new Promise<UserReadModel>((resolve) => {
      http.get(`http://localhost:3000/users/${id.value}`, (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          resolve(JSON.parse(data) as UserReadModel)
        })
      })
    })

    const userId = toEntityId(data.id)
    return new User(userId, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    })
  }
}
