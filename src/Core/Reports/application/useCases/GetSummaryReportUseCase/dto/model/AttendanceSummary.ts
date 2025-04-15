export class TotalAttendanceSummary {
    constructor(
        readonly familyGroup: {
            name: string,
            color: string
        } | null,
        readonly totalAttendance: string,
    ) { }
}