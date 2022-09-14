import ClientView from '../views/client-view.js';
import ClientResource from "../models/resource/client-resource.js";

export default class ClientController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const clientResource = new ClientResource();
        const id = req.query.id;

        if (!id || Number.isInteger(id) || id <= 0) {
            res.status(500)
                .send(`No id provided or id incorrect`);

            return;
        }

        const client = clientResource.getClientById(id);

        const clientView = new ClientView();
        clientView.setClient(client)

        res.render(clientView.getTemplate(), { 'this': clientView });
    }

    async #postHandler (res, req) {
        const clientResource = new ClientResource();
        await clientResource.postClient(req);

        res.redirect('/clients');
    }
}