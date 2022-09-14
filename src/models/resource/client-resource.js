import Database from "../../database.js";

export default class ClientResource {
    async getClients() {
        return await Database.makeQuery(`select * from client`);
    }

    async getClientById(id) {
        const clients = await Database.makeQuery(`select * from client where id='${id}'`);

        return clients[0];
    }

    async postClient(req) {
        const {name, surname, passport, password} = req.body;

        await Database.makeQuery(
            `INSERT INTO client (name, surname, passport, password) VALUES (?, ?, ?, ?)`,
            [name, surname, passport, password]);
    }

    async putClient(req) {
        const {id, name, surname, passport, password} = req.body;

        await Database.makeQuery(
            `UPDATE client SET name = ?, surname = ?, passport = ?, password = ? WHERE id = '${id}';`,
            [name, surname, passport, password]);
    }
}