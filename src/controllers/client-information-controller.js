import ClientInformationView from "../views/client-information-view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class ClientInformationController extends AbstractController {
    async getHandler (res, req) {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const clientInformationView = new ClientInformationView();
        const clientResource = new ClientResource();

        const client = await clientResource.getClientById(req.session.userId);
        clientInformationView
            .setClient(client)
            .setCsrfToken(req.session.csrfToken);

        this.render(res, clientInformationView, req.session.isLoggedIn)
    }

    async postHandler(res, req) {
        const params = req.body;

        const clientResource = new ClientResource();
        await clientResource.editClient(params);

        res.redirect('/user-profile');
    }
}