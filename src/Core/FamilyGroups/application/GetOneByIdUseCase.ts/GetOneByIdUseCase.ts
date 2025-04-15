import { Response } from "../../../Config";
import { FamilyGroup } from "../../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../../domain/repository/FamiltyGroupRepository";

export class GetOneByIdUseCase {

    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(id: string): Promise<Response<FamilyGroup>> {
        const familyGroup = await this.repository.getOneById(id);
        return new Response(true, "Succes Operation", familyGroup)
    }
}