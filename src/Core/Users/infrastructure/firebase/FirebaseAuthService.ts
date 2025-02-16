import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../Config/firebaseconfig";
import { IAuthService } from "../../application/interfaces/IAuthService";

const auth = firebaseAuth;

export class FirebaseAuthService implements IAuthService {
    async signIn(email: string, password: string): Promise<any> {

        try {
            const loggedUser = await signInWithEmailAndPassword(auth, email, password)
            const id = loggedUser.user.uid;
            const token = await loggedUser.user.getIdToken()

            return { id: id, token: token }
        } catch (error: any) {
            console.log(error?.message);
            return null;
        }
    }

}