import View from "../views/view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
import bcrypt from "bcrypt";

export default class ClientLoginController extends AbstractController {
    async getHandler(res, req) {
        const view = new View();
        view.setTemplate('login');

        if (req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }
        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler(res, req) {
        const clientResource = new ClientResource();
        const params = req.body;
        const textError = 'Неправильный пароль или email';

        const client = await clientResource.getClientIdPasswordByEmail(params.email);

        if (!client) {
            this.redirectToError(res, textError);

            return;
        }

        const isCorrectPassword = await bcrypt.compare(params.password, client.password)

        if (!isCorrectPassword) {
            this.redirectToError(res, textError);

            return;
        }

        req.session.isLoggedIn = true;
        req.session.userId = client.id;

        res.redirect('/user-profile');
    }
}