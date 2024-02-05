import { QueryOptions } from "../../../../../_lib/core";
import { User, UserId, toUserId } from "../../../../../_lib/common/entities/user";
import { UserRepository } from "../../../ports/user.repository";

export class LocalUserRepositorty implements UserRepository {

    private users: any[] = [];

    async getNextId() {
        return toUserId((this.users.length + 1).toString());
    }

    async get(id: UserId) {
        const user = this.users.find(u => u.id === id);
        return user;
    }

    async getAll(query: QueryOptions<User>) {
        return {
            data: this.users,
            pagination: {
                page: 1,
                count: this.users.length,
                maxPage: 1
            }
        }
    }

    async save(entity: User) {
        this.users.push(entity);
        return entity; 
    }

    async delete(id: UserId) {
        this.users = this.users.filter(u => u.id !== id);
    }
}