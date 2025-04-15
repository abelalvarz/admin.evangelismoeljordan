import { FamilyGroup } from "../model/FamilyGroup";

export interface FamilyGroupRepository {
    getAll(): Promise<FamilyGroup[]>;
    getOneById(id:string):Promise<FamilyGroup>;
    createGroup(familyGroup: FamilyGroup): Promise<void>;
}