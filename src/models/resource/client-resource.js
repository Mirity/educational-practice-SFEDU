import Database from "../../database.js";

export default class ClientResource {
    async getClientById(id) {
        const clients = await Database.makeQuery(`select * from client where id=${id}`);

        return clients[0];
    }

    async editClient(params) {
        const { id, name, surname, email, passport, password } = params;


        await Database.makeQuery(
            `UPDATE client SET email = ?, name = ?, surname = ?, passport = ?, password = ? WHERE id = '${id}';`,
            [email, name, surname, passport, password]);
    }

    async getClientIdPasswordByEmail(email) {
        const client = await Database.makeQuery(`SELECT password,id FROM client WHERE email = '${email}'`);

        return client[0];
    }

    async addNewClient(params) {
        const { name, surname, passport, password, email } = params;

        await Database.makeQuery(
            `INSERT INTO client (email, name, surname, passport, password) VALUES (?, ?, ?, ?, ?)`,
            [email, name, surname, passport, password]);
    }

    async getClientIdByEmail(email) {
        const client = await Database.makeQuery(
            `SELECT id FROM client WHERE email = '${email}'`
        )

        return client[0];
    }
}