import { Response } from "../../Config/Response";
import { FamilyGroup } from "../domain/model/FamilyGroup";
import { FamilyGroupRepository } from "../domain/repository/FamiltyGroupRepository";

export class GetAllGroupsUseCase {
    constructor(private readonly repository: FamilyGroupRepository) { }

    async execute(): Promise<Response<FamilyGroup[]>> {
        const data = await this.repository.getAll();
        return new Response(true, "Datos obtenidos con exito", data);
    }
}