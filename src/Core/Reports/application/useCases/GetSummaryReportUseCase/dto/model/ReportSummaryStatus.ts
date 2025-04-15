type Status = 'PENDING' | 'NOT_RECEIVED' | 'RECEIVED'

export class ReportSummaryStatus {
    constructor(
        readonly familyGroup: string,
        readonly meetingDate: Date | null,
        readonly status: Status ,
        readonly reportId: string | null | undefined
    ) { }
}