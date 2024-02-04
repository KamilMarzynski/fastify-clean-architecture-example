import { Entity, EntityId } from "../../core";

export type UserId = EntityId<'userId'>;
export type UserProps = {
    firstName: string;
    lastName: string;
    email: string;
}

export const toUserId = (id: string): UserId => {
    return id as UserId;
}

export class User implements Entity<UserId, UserProps> {
    constructor(readonly id: UserId, readonly props: UserProps) {}
}