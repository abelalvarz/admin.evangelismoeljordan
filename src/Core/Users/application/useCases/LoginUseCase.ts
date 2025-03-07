import { Response } from "../../../Config/Response";
import { UserRepository } from "../../domain/repository/UserRepository";
import { LoginUserRequest } from "../dtos/request/LoginUserRequest";
import { LoginUserResponse } from "../dtos/response/LoginUserResponse";
import { IAuthService } from "../interfaces/IAuthService";

export class LoginUseCase {

    constructor(
        private readonly repository: UserRepository,
        private readonly authService: IAuthService
    ) { }

    async execute(request: LoginUserRequest): Promise<Response<LoginUserResponse | null>> {

        const loggedUser = await this.authService.signIn(request.email, request.password);

        if (!loggedUser) {
            return new Response(false, "El correo o contraseña no son validos", null);
        }

        const user = await this.repository.findById(loggedUser.id)
        if (!user)
            return new Response(false, "Datos de usuario invalidos", null);

        return new Response(true, "Login exitoso", {
            name: user.name,
            email: user.email,
            role: user.role,
            token: loggedUser.token

        });
    }
}