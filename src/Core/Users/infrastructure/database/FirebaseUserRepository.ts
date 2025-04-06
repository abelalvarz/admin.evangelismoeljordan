import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp, firebaseAuth } from "../../../Config/firebaseconfig";
import { User } from "../../domain/model/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { doc, getDoc, setDoc } from 'firebase/firestore/lite'

const firebase = firebaseApp;
const auth = firebaseAuth;
const collectionName = "Users"

export class FirebaseUserRepository implements UserRepository {

    async create(user: User): Promise<User | null> {
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, user.email, user.password);

            const roles = []
            roles.push(user.role)

            const userDocRef = doc(firebase, `${collectionName}/${createdUser.user.uid}`)
            await setDoc(userDocRef, { name: user.name, email: user.email, role: roles, })

            return Promise.resolve(user);
        } catch (error) {
            return null;
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            const docRef = doc(firebase, `${collectionName}/${id}`)
            const docUser = await getDoc(docRef)

            const userData = docUser.data()
            return Promise.resolve(new User(
                docUser.id,
                userData?.name,
                userData?.email,
                userData?.role,
                ""
            ));
        } catch (error) {
            return null;
        }
    }

}