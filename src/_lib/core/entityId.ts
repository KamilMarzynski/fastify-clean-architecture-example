export interface EntityId<T> {
  value: T
}

export const toValue = <T>(entityId: EntityId<T>): T => entityId.value

export const toEntityId = <T>(value: T): EntityId<T> => ({ value })
