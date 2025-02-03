
export class Report {
    constructor(
        readonly id: string | null | undefined,
        readonly familyGroup: {
            name: string,
            color: string
        } | null,
        readonly activeMember: string,
        readonly activeMemberChildren: string,
        readonly noActiveMember: string,
        readonly noActiveMemberChildren: string,
        readonly visitorChildren: string,
        readonly visitors: string,
        readonly totalAttendance: string,
        readonly visitedHomes: string,
        readonly newChristians: string,
        readonly reconciled: string,
        readonly vigilAttendance: string,
        readonly offering: string,
        readonly notes: string,
        readonly meetingDate: Date,
        readonly creationDate: Date,
        readonly createdBy: string
    ) { }
}

// export class FamilyGroup {
//     constructor(
//         readonly name: string,
//         readonly color: string
//     ) { }
// }