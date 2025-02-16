import { addDoc, collection, getDocs } from "firebase/firestore/lite";
import { firebaseApp } from "../../../Config/firebaseconfig";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamiltyGroupRepository";

const database = firebaseApp;
const COLLECTION_NAME = "Family_Groups"

export class FirebaseFamilyGroupRepository implements FamilyGroupRepository {

    collection = collection(database, COLLECTION_NAME);

    async getAll(): Promise<FamilyGroup[]> {
        try {
            const groupShot = await getDocs(this.collection);
            const convertedList = groupShot.docs.map((doc) => {
                const data = doc.data()
                return new FamilyGroup(
                    doc.id,
                    data?.name,
                    data?.color,
                    data?.teacher,
                    data?.anfitrion,
                    data?.leaders,
                    data?.meetingDay,
                    data?.meetingTime
                )
            })
            return convertedList
        } catch (error) {
            throw error
        }
    }
    
    async createGroup(familyGroup: FamilyGroup): Promise<void> {
        try {
            await addDoc(this.collection, familyGroup)
        } catch (error) {
            throw error;
        }
    }

}