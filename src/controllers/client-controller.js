import ClientView from '../views/client-view.js';
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ClientController extends AbstractController {
    async execute(req, res, next) {
        await super.execute(req, res, next);
    }

    async getHandler (res, req) {
        const clientResource = new ClientResource();
        const id = req.query.id;

        super.isCorrectId(id, res);

        const client = clientResource.getClientById(id);

        const clientView = new ClientView();
        clientView.setClient(client)

        res.render(clientView.getTemplate(), { 'this': clientView });
    }

    async postHandler (res, req) {
        const queryParams = req.body;

        const clientResource = new ClientResource();
        await clientResource.addNewClient(queryParams);

        res.redirect('/clients');
    }
}