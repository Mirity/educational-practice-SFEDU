import ClientsView from '../views/clients-view.js';
import ClientResource from "../models/resource/client-resource.js";

export default class ClientsController {
   async execute(req, res, next) {
       if (req.method === 'GET') {
           await this.#getHandler(res);
       }
    }

    async #getHandler (res) {
        const clientResource = new ClientResource();
        const clients = clientResource.getClients();

        const clientsView = new ClientsView();
        clientsView.setClients(clients)

        res.render(clientsView.getTemplate(), { 'this': clientsView });
    }
}