import { Response } from "../../../Config/Response";
import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { CreateUserRequest } from "../dtos/request/CreateUserRequest";

export class RegisterUseCase {
    constructor(private readonly repository: UserRepository) { }

    async execute(user: CreateUserRequest): Promise<Response<null>> {
        const newUser = await this.repository.create(convertUser(user));
        if(!newUser)
            return new Response(false,"No se pudo crear el usuario",null)

        return new Response(true, "Usuario registrado exitosamente", null);
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