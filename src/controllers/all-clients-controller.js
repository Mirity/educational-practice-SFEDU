import ClientsView from '../views/clients-view.js';
import Database from '../database.js';

export default class ClientsController {
   async execute(req, res, next) {
       if (req.method === 'GET') {
           await this.#getHandler(res);
       }
    }

    async #getHandler (res) {
        const clients = await Database.makeQuery(`select * from client`);

        const clientsView = new ClientsView();
        clientsView.setClients(clients)

        res.render(clientsView.getTemplate(), { 'this': clientsView });
    }
}