import Database from "../../database.js";

export default class ClientResource {
    #getClientsQuery = `select * from client`;

    async getClients() {
        return Database.makeQuery(this.#getClientsQuery);
    }

    async getClientById(id) {
        const clients = await Database.makeQuery(`${this.#getClientsQuery} where id=${id}`);

        return clients[0];
    }

    async addNewClient(params) {
        const { name, surname, passport, password } = params;

        await Database.makeQuery(
            `INSERT INTO client (name, surname, passport, password) VALUES (?, ?, ?, ?)`,
            [name, surname, passport, password]);
    }

    async editClient(params) {
        const { id, name, surname, email, passport, password } = params;


        await Database.makeQuery(
            `UPDATE client SET email = ?, name = ?, surname = ?, passport = ?, password = ? WHERE id = '${id}';`,
            [email, name, surname, passport, password]);
    }
}