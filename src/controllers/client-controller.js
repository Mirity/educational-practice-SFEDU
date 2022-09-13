import ClientView from '../views/client-view.js';
import Database from "../database.js";
import ClientsView from "../views/clients-view.js";

export default class ClientController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const clients = await Database.makeQuery(`select * from client where id='${req.query.id}'`);

        const clientView = new ClientView();
        clientView.setClient(clients)

        res.render(clientView.getTemplate(), { 'this': clientView });
    }

    async #postHandler (res, req) {
        const {name, surname, passport, password} = req.body;

        await Database.makeQuery(
            `INSERT INTO client (name, surname, passport, password) VALUES (?, ?, ?, ?)`,
            [name, surname, passport, password]);
        res.redirect('/clients');
    }
}