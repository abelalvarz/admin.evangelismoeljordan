import { LoginUseCase } from "../../application/useCases/LoginUseCase";
import { RegisterUseCase } from "../../application/useCases/RegisterUserCase";
import { FirebaseAuthService } from "../firebase/FirebaseAuthService";
import { FirebaseUserRepository } from "../database/FirebaseUserRepository";

const repository = new FirebaseUserRepository()
const authService = new FirebaseAuthService()

export const UserService = {
    register: new RegisterUseCase(repository),
    login: new LoginUseCase(repository, authService)
}