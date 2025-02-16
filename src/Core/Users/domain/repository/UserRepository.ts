import { User } from "../model/User";

export interface UserRepository {
    create(user: User): Promise<User | null>;
    findById(id: string): Promise<User | null>
}