import ClientView from '../views/client-view.js';
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class EditClientController extends AbstractController {
    async getHandler (res, req) {
        const clientResource = new ClientResource();
        const id = req.query.id;

        this.idHandler(id, res);

        const client = clientResource.getClientById(id);

        const clientView = new ClientView();
        clientView
            .setClient(client)
            .setTemplate('edit-client');

        res.render(clientView.getTemplate(), { 'this': clientView });
    }

    async postHandler(res, req) {
        const params = req.body;

        const clientResource = new ClientResource();
        await clientResource.editClient(params);

        res.redirect('/clients');
    }
}