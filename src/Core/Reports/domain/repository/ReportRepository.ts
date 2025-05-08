import { Report } from "../model/Report";

export interface ReportRepository {
    create(report: Report): Promise<void>
    update(report: Report): Promise<void>
    delete(id: string): Promise<void>
    getAllBetweenDates(startDate: Date, endDate: Date): Promise<Report[]>
    getOneById(id: string): Promise<Report>
    existsReportBetweenDateAndGroup(group: string, startDate: Date, endDate: Date): Promise<boolean>
}