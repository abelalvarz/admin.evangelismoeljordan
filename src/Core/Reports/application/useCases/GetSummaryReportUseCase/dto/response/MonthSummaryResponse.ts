export class MonthSummaryResponse {
    constructor(
        readonly weeks: Date[][],
        readonly totalAttendance: number[]
    ) { }
}