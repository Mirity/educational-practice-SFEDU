import { Client } from "../../abstracts/client";

export default class ClientEntity {
    private id: number | string | undefined;
    private name: string;
    private surname: string;
    private passport: string;
    private password: string;
    private email: string;

    constructor({ id, name, surname, passport, password, email }: Client) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.passport = passport;
        this.password = password;
        this.email = email;
    }

    public getId(): number | string | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public getPassport(): string {
        return this.passport;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }
}