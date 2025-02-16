import { ReportRepository } from "../../domain/repository/ReportRepository";
import { SummaryReport } from "../dtos/SummaryReport";

export class GetSummaryReportUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(initialDate:Date, finalDate:Date): Promise<SummaryReport> {
        const reports = await this.repository.getAllBetweenDates(initialDate,finalDate);

        const totalAttendents = reports.reduce((acc, report) => acc + (report.totalAttendance || 0), 0)
        const visitedHomes = reports.reduce((acc, report) => acc + (report.visitedHomes || 0), 0)
        const visitors = reports.reduce((acc, report) => acc + (report.visitors || 0), 0)
        const newChristians = reports.reduce((acc, report) => acc + (report.newChristians || 0), 0)
        
        return new SummaryReport(totalAttendents, visitedHomes, visitors, newChristians)
    }
}
