import { Report } from "../../../domain/model/Report";
import { ReportRepository } from "../../../domain/repository/ReportRepository";

const reports: Report[] = []

export class InMemoryReportRepository implements ReportRepository{
    getOneById(id: string): Promise<Report> {
        console.log("Received id:",id)
        throw new Error("Method not implemented.");
    }
    getByPeriod(initialDate: Date, finalDate: Date): Promise<Report[]> {
        console.log(initialDate, finalDate)
        throw new Error("Method not implemented.");
    }
    async create(report: Report): Promise<void> {
        reports.push(report)
        return Promise.resolve()
    }
    async getAll(): Promise<Report[]> {
        return Promise.resolve(reports)
    }

    
}