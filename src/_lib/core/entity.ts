import { type EntityId } from './entityId'

export interface Entity<ID extends EntityId<string>, P> {
  readonly id: ID
  readonly props: P
}
