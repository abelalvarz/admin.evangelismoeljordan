import { FamilyGroup } from "../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../domain/repository/FamiltyGroupRepository";

export class GetAllGroupsUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    execute(): Promise<FamilyGroup[]> {
        return this.repository.getAll();
    }
}