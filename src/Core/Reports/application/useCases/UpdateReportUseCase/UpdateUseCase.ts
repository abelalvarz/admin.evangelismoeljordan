import { Response } from "../../../../Config/Response";
import { Report } from "../../../domain/model/Report";
import { ReportRepository } from "../../../domain/repository/ReportRepository";

export class UpdateUseCase {
    constructor(private readonly repository: ReportRepository) { }
    async execute(report: Report): Promise<Response<null>> {
        await this.repository.update(report);
        return new Response(true, "Actualizacion exitosa", null)
    }
}