
export class SummaryReport {
    constructor(
        readonly totalAttendance: string | number,
        readonly totalHomeVisited: string | number,
        readonly totalVisitors: string | number,
        readonly totalNewChristians: string | number,
    ) { }
}