import Database from "../../database.js";
import { Client } from "../../abstracts/client";

export default class ClientResource {
    public async getClientById(id: number): Promise<Client> {
        const clients = await Database.makeQuery<Client[]>(`select * from client where id=${id}`, null);

        return clients[0];
    }

    public async editClient(params: Client): Promise<void> {
        const { id, name, surname, email, passport, password } = params;


        await Database.makeQuery(
            `UPDATE client SET email = ?, name = ?, surname = ?, passport = ?, password = ? WHERE id = '${id}';`,
            [email, name, surname, passport, password]);
    }

    public async getClientByEmail(email: string): Promise<Client | undefined> {
        const client = await Database.makeQuery<Client[]>(`SELECT * FROM client WHERE email = '${email}'`, null);

        return client[0];
    }

    public async addNewClient(params: Client): Promise<void> {
        const { name, surname, passport, password, email } = params;

        await Database.makeQuery(
            `INSERT INTO client (email, name, surname, passport, password) VALUES (?, ?, ?, ?, ?)`,
            [email, name, surname, passport, password]);
    }
}