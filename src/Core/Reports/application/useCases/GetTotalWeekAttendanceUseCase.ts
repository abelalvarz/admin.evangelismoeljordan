import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { TotalAttendance } from "../dtos/TotalAttendance";

export class GetTotalWeekAttendanceUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(initialDate: Date, finalDate: Date): Promise<TotalAttendance[]> {

        const reports = await this.repository.getAllBetweenDates(initialDate, finalDate);
        const reportsByName = reports.reduce((acc: any, report: Report) => {
            const groupName = report.familyGroup?.name;

            if (groupName === undefined || groupName === null) {
                return;
            }

            if (!acc[groupName]) {
                acc[groupName] = {
                    familyGroup: {
                        name: report.familyGroup?.name,
                        color: report.familyGroup?.color
                    },
                    totalAttendance: report.totalAttendance || 0
                };
                return acc;
            }

            acc[groupName].totalAttendance += report.totalAttendance || 0;
            return acc;
        }, {});


        const totalList = Object.entries(reportsByName).map(([, value]: [string, any]) => new TotalAttendance(value.familyGroup, value.totalAttendance));
        return Promise.resolve(totalList)
    }
}