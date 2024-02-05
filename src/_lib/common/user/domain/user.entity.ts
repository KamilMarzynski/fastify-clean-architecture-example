import { Entity, EntityId } from "../../../core";

export type UserId = EntityId<string>;
export type UserProps = {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
}

export class User implements Entity<UserId, UserProps> {
    constructor(readonly id: UserId, readonly props: UserProps) {}
}