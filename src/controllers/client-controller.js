import ClientView from '../views/client-view.js';
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ClientController extends AbstractController {
    async getHandler (res, req) {
        const clientResource = new ClientResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const client = clientResource.getClientById(id);

        const clientView = new ClientView();
        clientView.setClient(client)

        res.render(clientView.getTemplate(), { 'this': clientView });
    }

    async postHandler (res, req) {
        const params = req.body;

        const clientResource = new ClientResource();
        await clientResource.addNewClient(params);

        res.redirect('/clients');
    }
}