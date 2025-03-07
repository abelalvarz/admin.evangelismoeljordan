import { Response } from "../../../Config/Response";
import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";

export class GetAllBetweenDateUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(startDate: Date, endDate: Date): Promise<Response<Report[]>> {
        const data = await this.repository.getAllBetweenDates(startDate, endDate);
        return new Response(true, "Reportes obtenidos con exito", data)
    }
}

