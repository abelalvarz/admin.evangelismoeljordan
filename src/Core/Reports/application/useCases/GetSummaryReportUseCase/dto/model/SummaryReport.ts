export class SummaryReport {
    constructor(
        readonly totalAttendance: number,
        readonly totalHomeVisited: number,
        readonly totalVisitors:  number,
        readonly totalNewChristians: number,
    ) { }
}