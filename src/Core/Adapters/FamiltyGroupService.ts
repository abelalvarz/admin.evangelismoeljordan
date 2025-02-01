import { CreateGroupUseCase } from "../FamilyGroups/application/createGroupUseCase";
import { GetAllGroupsUseCase } from "../FamilyGroups/application/getAllGroupsUseCase";
import { FirebaseFamilyGroupRepository } from "../FamilyGroups/infrastructure/FirebaseFamilyGroupRepository";
// import { InMemoryFamiltyGroupRepository } from "../infrastructure/persistance/InMemoryFamilyGroupRepository"

// const repository = new InMemoryFamiltyGroupRepository();
const repository  = new FirebaseFamilyGroupRepository();
export const FamilyGroupService = {
    getAll: new GetAllGroupsUseCase(repository),
    create: new CreateGroupUseCase(repository)
}