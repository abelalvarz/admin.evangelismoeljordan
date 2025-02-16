
export class User {
    constructor(
        readonly id: string | null,
        readonly name: string,
        readonly email: string,
        readonly role: string,
        readonly password: string
    ) { }
}