import { Response } from "../../../Config/Response";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { SummaryReport } from "../dtos/SummaryReport";

export class GetSummaryReportUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(startDate: Date, endDate: Date): Promise<Response<SummaryReport>> {
        const reports = await this.repository.getAllBetweenDates(startDate, endDate);

        const totalAttendents = reports.reduce((acc, report) => acc + (report.totalAttendance || 0), 0)
        const visitedHomes = reports.reduce((acc, report) => acc + (report.visitedHomes || 0), 0)
        const visitors = reports.reduce((acc, report) => acc + (report.visitors || 0), 0)
        const newChristians = reports.reduce((acc, report) => acc + (report.newChristians || 0), 0)
        const response = new SummaryReport(totalAttendents, visitedHomes, visitors, newChristians);
        return new Response(true, "Resumen obtenido con exito", response)
    }
}
