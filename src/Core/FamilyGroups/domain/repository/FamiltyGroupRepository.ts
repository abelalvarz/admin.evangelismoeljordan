import { FamilyGroup } from "../model/FamilyGroup";

export interface FamilyGroupRepository {
    getAll(): Promise<FamilyGroup[]>;
    createGroup(familyGroup: FamilyGroup): Promise<void>;
}