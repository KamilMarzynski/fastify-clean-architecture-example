import { Repository } from "../../../../_lib/core";
import { User } from "../../../../_lib/_sharedKernel";

export type UserRepository = Repository<User> & {
  findByEmail(email: string): Promise<User | null>;
};
