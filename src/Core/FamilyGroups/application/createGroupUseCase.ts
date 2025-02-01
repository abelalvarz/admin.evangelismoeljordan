import { FamilyGroup } from "../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../domain/repository/FamiltyGroupRepository";

export class CreateGroupUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    execute(familyGroup: FamilyGroup): Promise<void> {
        return this.repository.createGroup(familyGroup)
    }
}