import View from "../views/view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import bcrypt from "bcrypt";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class ClientLoginController extends AbstractWebController implements IController {
    async getHandler(res: Response, req: Request): Promise<void> {
        const view = new View('login');
        view.setCsrfToken(req.session.csrfToken);

        if (req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }

        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler(res: Response, req: Request): Promise<void> {
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
        req.session.userId = client.id as number;

        res.redirect('/user-profile');
    }
}