export class UserRecovery {
    username: string;
    factorType: string;
    relayState: string;

    constructor() {
        this.username = '';
        this.factorType = 'EMAIL';
        this.relayState = '';
    }
}