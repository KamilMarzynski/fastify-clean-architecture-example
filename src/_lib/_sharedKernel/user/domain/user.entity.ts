import { type Entity, type EntityId } from '../../../core'

export type UserId = EntityId<string>
export interface UserProps {
  readonly firstName: string
  readonly lastName: string
  readonly email: string
}

export class User implements Entity<UserId, UserProps> {
  constructor (readonly id: UserId, readonly props: UserProps) { }

  public update (props: Partial<UserProps>): User {
    return new User(this.id, { ...this.props, ...props })
  }
}
