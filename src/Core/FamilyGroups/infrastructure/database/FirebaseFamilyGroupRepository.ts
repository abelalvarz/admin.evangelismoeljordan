import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../../../Config/firebaseconfig";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamiltyGroupRepository";

const database = firebaseApp;
const COLLECTION_NAME:string = "Family_Groups"

export class FirebaseFamilyGroupRepository implements FamilyGroupRepository {
    collection = collection(database, COLLECTION_NAME);

    async getOneById(id: string): Promise<FamilyGroup> {
        try{
            const docRef =  doc(database, "Family_Groups", id);
            const querySnap = await getDoc(docRef)
            console.log(querySnap)
            const familyGroup = { id: querySnap.id, data: querySnap.data() }

            return Promise.resolve( new FamilyGroup(familyGroup.id, 
                familyGroup.data?.name,
                familyGroup.data?.color, 
                familyGroup.data?.teacher, 
                familyGroup.data?.anfitrion, 
                familyGroup.data?.leaders,
                familyGroup.data?.meetingDay, 
                familyGroup.data?.meetingTime))

        }catch(error){
            console.log(error)
            throw error;
        }
    }


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