import type { Entity } from './entity'
import { type EntityId } from './entityId'

type Order = 'asc' | 'desc'
type OrderBy<E extends Entity<EntityId<string>, E['props']>> = keyof E['props']

export interface PaginatedResult<E extends Entity<EntityId<string>, E['props']>> {
  data: E[]
  pagination: {
    page: number
    count: number
    maxPage: number
  }
}

export interface QueryOptions<E extends Entity<EntityId<string>, E['props']>> {
  limit?: number
  page?: number
  orderBy?: OrderBy<E>
  order?: Order
  filter?: Partial<E['props']>
}

export interface Repository<E extends Entity<EntityId<any>, E['props']>> {
  getNextId: () => Promise<E['id']>
  get: (id: E['id']) => Promise<E | null>
  getAll: (query: QueryOptions<E>) => Promise<PaginatedResult<E>>
  save: (entity: E) => Promise<E>
  delete: (id: E['id']) => Promise<void>
}
