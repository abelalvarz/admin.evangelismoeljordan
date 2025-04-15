type Status = 'RECEIVED' | 'NOT_RECEIVED' | 'PENDING'
export interface FamilyGroupReport{
    familyGroupId:string,
    familyGroup:string,
    teacher:string,
    status:Status,
    meetingDate:Date | null,
    reportId: string | null | undefined
}