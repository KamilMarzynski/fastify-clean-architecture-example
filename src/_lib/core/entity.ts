import { EntityId } from "./entityId"

export type Entity<ID extends EntityId<string>, P> = {
    readonly id: ID
    readonly props: P
}