import { Response } from "../../../Config/Response";
import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetOneByIdUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(id: string): Promise<Response<Report>> {
        const report = await this.repository.getOneById(id)
        return new Response(true, "Reporte obtenido exitosamente!", report)
    }
}