import View from "../views/view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
//@ts-ignore
import bcrypt from "bcrypt";
import { IController } from "../abstracts/common";

export default class ClientLoginController extends AbstractController implements IController {
    async getHandler(res: any, req: any): Promise<void> {
        const view = new View('login');
        view.setCsrfToken(req.session.csrfToken);

        if (req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }

        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler(res: any, req: any): Promise<void> {
        const clientResource = new ClientResource();
        const params = req.body;
        const textError = 'Неправильный пароль или email';

        const client = await clientResource.getClientByEmail(params.email);

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