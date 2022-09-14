import ClientsView from '../views/clients-view.js';
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ClientsController extends AbstractController {
   async execute(req, res, next) {
       await super.execute(req, res, next);
   }

    async getHandler (res) {
        const clientResource = new ClientResource();
        const clients = clientResource.getClients();

        const clientsView = new ClientsView();
        clientsView.setClients(clients)

        res.render(clientsView.getTemplate(), { 'this': clientsView });
    }
}