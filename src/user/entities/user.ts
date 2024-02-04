import { Entity, EntityId } from "../../_lib/core";

type UserId = EntityId<'userId'>;
type UserProps = {
    firstName: string;
    lastName: string;
    email: string;
}


export class User implements Entity<UserId, UserProps> {
    constructor(readonly id: UserId, readonly props: UserProps) {}
}