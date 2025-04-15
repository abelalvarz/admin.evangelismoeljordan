export class AttendanceSummaryResponse {
    constructor(
        readonly familyGroups: string[],
        readonly attendance: number[],
        readonly colors: string[]
    ){}
}