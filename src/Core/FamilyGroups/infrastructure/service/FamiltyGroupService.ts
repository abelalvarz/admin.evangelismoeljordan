import { CreateGroupUseCase } from "../../application/createGroupUseCase";
import { GetAllGroupsUseCase } from "../../application/getAllGroupsUseCase";
import { FirebaseFamilyGroupRepository } from "../database/FirebaseFamilyGroupRepository";
// import { InMemoryFamiltyGroupRepository } from "../infrastructure/persistance/InMemoryFamilyGroupRepository"

// const repository = new InMemoryFamiltyGroupRepository();
const repository  = new FirebaseFamilyGroupRepository();
export const FamilyGroupService = {
    getAll: new GetAllGroupsUseCase(repository),
    create: new CreateGroupUseCase(repository)
}