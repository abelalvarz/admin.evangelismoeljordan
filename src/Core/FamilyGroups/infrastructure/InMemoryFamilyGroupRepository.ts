import { FamilyGroup } from "../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../domain/repository/FamiltyGroupRepository";

const FamilyGroups: FamilyGroup[] = []

export class InMemoryFamiltyGroupRepository implements FamilyGroupRepository {

    getAll(): Promise<FamilyGroup[]> {
        return Promise.resolve(FamilyGroups);
    }
    createGroup(familyGroup: FamilyGroup): Promise<void> {
        FamilyGroups.push(familyGroup)
        return Promise.resolve()
    }

}