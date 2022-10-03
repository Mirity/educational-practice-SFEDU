import ClientsView from '../views/clients-view.js';
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ClientsController extends AbstractController {
    async getHandler (res, req) {
        const clientResource = new ClientResource();
        const clients = await clientResource.getClients();

        const clientsView = new ClientsView();
        clientsView.setClients(clients)

        res.render(clientsView.getTemplate(), {
            'this': clientsView,
            isLoggedIn: req.session.isLoggedIn
        });
    }
}