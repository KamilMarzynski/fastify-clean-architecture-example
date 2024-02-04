import type { Entity } from "./entity";
import { EntityId } from "./entityId";

type Order = 'asc' | 'desc'
type OrderBy<E extends Entity<EntityId<string>, E['props']>> = keyof E['props'];

type PaginatedResult<E extends Entity<EntityId<string>, E['props']>> = {
    data: E[];
    pagination: {
        page: number;
        count: number;
        maxPage: number;
    }
}

export type QueryOptions<E extends Entity<EntityId<string>, E['props']>> = {
    limit?: number;
    page?: number;
    orderBy?: OrderBy<E>;
    order?: Order;
}

export type Repository<E extends Entity<EntityId<string>, E['props']>> = {
    get: (id: E['id']) => Promise<E | undefined>
    getAll: (query: QueryOptions<E>) => Promise<PaginatedResult<E>>
    save: (entity: E) => Promise<E>
    delete: (id: E['id']) => Promise<void>
}