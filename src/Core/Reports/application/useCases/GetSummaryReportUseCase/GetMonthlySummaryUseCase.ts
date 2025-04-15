import { getFinishTime, getInitTime, getPeriodTime } from "../../../../../UI/App/utils";
import { Response } from "../../../../Config";
import { ReportRepository } from "../../../domain/repository/ReportRepository";
import { MonthSummaryResponse } from "./dto";
import { IGetMonthlySummaryUseCase } from "./interfaces";

export class GetMonthlySummaryUseCase implements IGetMonthlySummaryUseCase {
    constructor(private readonly repository: ReportRepository) { }
    async execute(): Promise<Response<MonthSummaryResponse | null>> {
        const startDate = getInitTime(4)
        const endDate = getFinishTime(0)
        const reports = await this.repository.getAllBetweenDates(startDate, endDate);

        const weeks = Array.from({ length: 4}, (_, i) => getPeriodTime(i))
        const orderedWeeks = weeks.sort((a, b) => a.initial.getTime() - b.initial.getTime());

        const weeksValues: Date[][] = []
        const totalValues: number[] = []

        orderedWeeks.forEach((week) => {
            const weekArray = []
            const totalAttendance = reports
                .filter((report) => report.meetingDate >= week.initial && report.meetingDate <= week.final)
                .reduce((acc, report) => acc + (report.totalAttendance || 0), 0);
            
                weekArray.push(week.initial)
            weekArray.push(week.final)

            weeksValues.push(weekArray)
            totalValues.push(totalAttendance)
        });

        return new Response(true, "", new MonthSummaryResponse(weeksValues, totalValues));
    }

}