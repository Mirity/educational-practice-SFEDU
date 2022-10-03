import Database from "../../database.js";

export default class RegistrationResource {
    async addNewClient(params) {
        const { name, surname, passport, password, email } = params;

        await Database.makeQuery(
            `INSERT INTO client (email, name, surname, passport, password) VALUES (?, ?, ?, ?, ?)`,
            [email, name, surname, passport, password]);
    }

    async getClientByEmail(params) {
        const { name, surname, passport, password, email } = params;

        const client = await Database.makeQuery(
            `SELECT id FROM client WHERE email = '${email}'`
        )

        return client[0];
    }
}