export class FamilyGroup {
    constructor(
        readonly id: string | null,
        readonly name: string,
        readonly color: string,
        readonly teacher: string,
        readonly anfitrion: string,
        readonly leaders: string,
        readonly meetingDay: string,
        readonly meetingTime: string
    ) { }
}