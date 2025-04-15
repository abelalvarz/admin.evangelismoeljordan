import { SummaryReport } from "../model/SummaryReport";
import { CategorySummary } from "../model/CategorySummary";
// import { ReportSummaryStatus } from "../model/ReportSummaryStatus";
import { AttendanceSummaryResponse } from "./AttendanceSummaryResponse";

export class SummaryReportResponse {
    constructor(
        readonly totalsSummary: SummaryReport,
        readonly attendanceSummary: AttendanceSummaryResponse | null,
        readonly categoriesSummary: CategorySummary | null,
        // readonly reportStatusSummary: ReportSummaryStatus[] | []
    ) { }
}