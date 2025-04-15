import { Report } from "../../../../domain/model/Report";
import { SummaryReport } from "../dto";
import { ITotalsSummaryProcesor } from "./IHelpers";

export class TotalsSummaryProcesor implements ITotalsSummaryProcesor {

    execute(data: Report[]): SummaryReport {
        const summary = data.reduce(
            (acc, report) => {
                acc.totalAttendents += report.totalAttendance || 0;
                acc.visitedHomes += report.visitedHomes || 0;
                acc.visitors += report.visitors || 0;
                acc.newChristians += report.newChristians || 0;
                return acc;
            },
            { totalAttendents: 0, visitedHomes: 0, visitors: 0, newChristians: 0 }
        );

        return new SummaryReport(
            summary.totalAttendents,
            summary.visitedHomes,
            summary.visitors,
            summary.newChristians
        );
    }

}