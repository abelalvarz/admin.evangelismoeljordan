type Status = 'RECEIVED' | 'NOT_RECEIVED' | 'PENDING'
export interface FamilyGroupReport{
    familyGroup:string,
    status:Status,
    meetingDate:Date | null,
    reportId: string | null | undefined
}