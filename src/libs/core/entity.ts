import { EntityId } from "./entityId"

export type Entity<ID extends EntityId<string>, P> = {
    id: ID
    props: P
}