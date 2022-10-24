import { ServiceRecord } from "../../abstracts/service-record";


export default class ServiceRecordEntity {
    private id: number | string | undefined;
    private date: Date | string;
    private number: string;
    private passport: string;
    private clientName: string;
    private clientSurname: string;

    constructor({ id, date, number, passport, clientName, clientSurname }: ServiceRecord) {
        this.id = id;
        this.date = date;
        this.number = number;
        this.passport = passport;
        this.clientName = clientName;
        this.clientSurname = clientSurname;
    }

    public getId(): number | string | undefined {
        return this.id;
    }

    public getDate(): Date | string {
        return this.date;
    }

    public getNumber(): string {
        return this.number;
    }

    public getPassport(): string {
        return this.passport;
    }

    public getClientSurname(): string {
        return this.clientSurname;
    }

    public getClientName(): string {
        return this.clientName;
    }
}