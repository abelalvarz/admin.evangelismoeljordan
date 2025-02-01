import { Report } from "../../domain/model/Report"
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { TotalCategoryAttendance } from "../dtos/TotalCategoryAttendance"

export class GetTotalAttendanceByCategory {

    constructor(private readonly repository: ReportRepository) { }

    async execute(initialDate:Date, finalDate:Date): Promise<TotalCategoryAttendance[]> {
        const reports = await this.repository.getByPeriod(initialDate, finalDate)
        const totalActiveMembers = reports.reduce((accumulator, report: Report) => accumulator + (parseInt(report.activeMember) | 0), 0)
        const totalNoActiveMembers = reports.reduce((accumulator, report: Report) => accumulator + (parseInt(report.noActiveMember) | 0), 0)
        const totalVisitor = reports.reduce((accumulator, report: Report) => accumulator + (parseInt(report.visitors) | 0), 0)

        const returnDate: TotalCategoryAttendance[] = []
        returnDate.push(new TotalCategoryAttendance("Miembros Activos", (totalActiveMembers.toString() || "0")))
        returnDate.push(new TotalCategoryAttendance("Miembros no Activos", (totalNoActiveMembers.toString() || "0")))
        returnDate.push(new TotalCategoryAttendance("Amigos Visitantes", (totalVisitor.toString() || "0")))

        return Promise.resolve(returnDate)
    }
}