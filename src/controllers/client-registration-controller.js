import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
import bcrypt from 'bcrypt';
import View from "../views/view.js";

export default class ClientRegistrationController extends AbstractController {
    async getHandler (res, req) {
        const view = new View();
        view
            .setTemplate('registration')
            .setCsrfToken(req.session.csrfToken);

        if(req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }
        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler (res, req) {
        const params = req.body;
        params.password = await bcrypt.hash(params.password, 10);

        const clientResource = new ClientResource();
        const clientId = await clientResource.getClientIdByEmail(params.email);

        if(!(params.csrf_token === req.session.csrfToken)) {
            this.redirectToError(res, 'Отказано в доступе');

            return;
        }

        if(clientId) {
            this.redirectToError(res, 'Пользователь с таким email уже существует');

            return;
        }

        await clientResource.addNewClient(params);

        res.redirect('/login');

    }
}