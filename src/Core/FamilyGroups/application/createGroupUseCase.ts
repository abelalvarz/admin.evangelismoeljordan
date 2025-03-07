import { Response } from "../../Config/Response";
import { FamilyGroup } from "../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../domain/repository/FamiltyGroupRepository";

export class CreateGroupUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(familyGroup: FamilyGroup): Promise<Response<null>> {
        await this.repository.createGroup(familyGroup);
        return new Response(true, "Grupo Familiar creado con exito", null)
    }
}