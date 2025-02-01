import { Report } from "../model/Report";

export interface ReportRepository {
    create(report: Report): Promise<void>
    getByPeriod(initialDate: Date, finalDate: Date): Promise<Report[]>
    getAll(): Promise<Report[]>
}