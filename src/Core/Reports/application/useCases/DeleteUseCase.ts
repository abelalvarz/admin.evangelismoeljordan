import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class DeleteReportUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(id: string): Promise<Response<null>> {
        await this.repository.delete(id);
        return new Response(true, "Reporte eliminado exitosamente", null)
    }
}