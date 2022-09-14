import Database from "../../database.js";

export default class ClientResource {
    #selectQuery = `select * from client`;

    async getClients() {
        return await Database.makeQuery(this.#selectQuery);
    }

    async getClientById(id) {
        const clients = await Database.makeQuery(`${this.#selectQuery} where id='${id}'`);

        return clients[0];
    }

    async addNewClient(queryParams) {
        const { name, surname, passport, password } = queryParams;

        await Database.makeQuery(
            `INSERT INTO client (name, surname, passport, password) VALUES (?, ?, ?, ?)`,
            [name, surname, passport, password]);
    }

    async editClient(queryParams) {
        const { id, name, surname, passport, password } = queryParams;

        await Database.makeQuery(
            `UPDATE client SET name = ?, surname = ?, passport = ?, password = ? WHERE id = '${id}';`,
            [name, surname, passport, password]);
    }
}