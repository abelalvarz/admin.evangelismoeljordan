import { FamilyGroup } from "../../../FamilyGroups/domain/model/FamilyGroup";

export class CreateReportRequest {
    constructor(
        readonly familyGroup: FamilyGroup | null,
        readonly activeMembers: number | null,
        readonly activeMembersChildren: number | null,
        readonly noActiveMembers: number | null,
        readonly noActiveMembersChildren: number | null,
        readonly visitorChildren: number | null,
        readonly visitors: number | null,
        readonly totalAttendance: number | null,
        readonly visitedHomes: number | null,
        readonly newChristians: number | null,
        readonly reconciled: number | null,
        readonly vigilAttendance: number | null,
        readonly offering: number | null,
        readonly comments: string,
        readonly meetingDate: Date,
        readonly creationDate: Date,
        readonly createdBy: string
    ) { }
}