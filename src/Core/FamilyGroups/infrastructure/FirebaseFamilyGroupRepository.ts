import { firebaseApp } from "../../Shared/utils/firebaseconfig";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { FamilyGroupRepository } from "../domain/repository/FamiltyGroupRepository";
import { FamilyGroup } from "../domain/model/FamilyGroup";

const database = firebaseApp;
export class FirebaseFamilyGroupRepository implements FamilyGroupRepository {

    collection = collection(database, 'Family_Groups');

    async getAll(): Promise<FamilyGroup[]> {
        const groupShot = await getDocs(this.collection);
        const groupList = groupShot.docs.map(doc => {
            return doc.data()
        })
        const convertedList = groupList.map((item) => {
            return new FamilyGroup(item.color, item.name)
        })
        return Promise.resolve(convertedList)
    }
    async createGroup(familyGroup: FamilyGroup): Promise<void> {
        await addDoc(this.collection, familyGroup)
        return Promise.resolve()
    }

}