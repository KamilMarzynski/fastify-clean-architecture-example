import { QueryOptions } from "../../../../../../_lib/core";
import { User, UserId } from "../../../../../../_lib/_sharedKernel";
import { UserRepository } from "../../../../ports/repositories/user.repository";

export class LocalUserRepository implements UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.email === email) || null;
    }

    private users: any[] = [];

    async getNextId() {
        return {
            value: (this.users.length + 1).toString()
        }
    }

    async get(id: UserId) {
        return this.users.find(u => u.id === id) || null;
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