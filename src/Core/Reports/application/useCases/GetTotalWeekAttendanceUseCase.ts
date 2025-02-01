import { Report } from "../../domain/model/Report";
import { ReportRepository } from "../../domain/repository/ReportRepository";
import { TotalAttendance } from "../dtos/TotalAttendance";

export class GetTotalWeekAttendanceUseCase {
    constructor(private readonly repository: ReportRepository) { }

    async execute(initialDate: Date, finalDate: Date): Promise<TotalAttendance[]> {
        const reports = await this.repository.getByPeriod(initialDate, finalDate)

        const agruppedByName = reports.reduce((acc: any, report: Report) => {

            console.log("report",report)
            const groupName = report.familyGroup?.name
            if (groupName === undefined) {
                return;
            }
            
            if (!acc[groupName]) {
                acc[groupName] = {
                    familyGroup: {
                        name: report.familyGroup?.name,
                        color: report.familyGroup?.color
                    },
                    totalAttendance: parseInt(report.totalAttendance) | 0
                };

                console.log("acc",acc)
            }
            acc[groupName].totalAttendance += parseInt(report.totalAttendance) | 0;
            console.log(acc)
            return acc;
        }, {});

        const totalList = Object.entries(agruppedByName).map(([, value]: [string, any]) => new TotalAttendance(value.familyGroup, value.totalAttendance));
        return Promise.resolve(totalList)
    }
}