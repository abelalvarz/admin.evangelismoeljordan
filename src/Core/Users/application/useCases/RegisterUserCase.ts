import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class RegisterUseCase {
    constructor(private readonly repository: UserRepository) { }

    async execute(user: any) {
        return this.repository.create(convertUser(user));
    }
}

export const convertUser = (user: any) => {
    return new User(
        null,
        isValid(user.name),
        isValid(user.email),
        isValid(user.role),
        isValid(user.password),
    )
}

const isValid = (item: any) => {
    if (item === null) {
        throw Error(item + "is null")
    }
    return item
}