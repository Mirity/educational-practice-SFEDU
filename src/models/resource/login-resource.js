import Database from "../../database.js";

export default class LoginResource {
    async getClientByEmail(email) {
        const client = await Database.makeQuery(`SELECT password FROM client WHERE email = '${email}'`);

        return client[0];
    }

    async getClientIdByEmail(email) {
        const clientId = await Database.makeQuery(`SELECT id FROM client WHERE email = '${email}'`);

        return clientId[0];
    }
}