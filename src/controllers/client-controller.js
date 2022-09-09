import ClientView from '../views/client-view.js';
import Database from "../database.js";

export default class ClientController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const clients = await connection.awaitQuery(`select * from client where id=1`);

        const clientView = new ClientView();
        clientView.setClient(clients)

        res.render(clientView.getTemplate(), { 'this': clientView });
    }
}