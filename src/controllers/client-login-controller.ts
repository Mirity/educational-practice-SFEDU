import View from "../views/view.js";
import AbstractWebController from "./abstract-web-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ClientProvider from "../models/provider/client-provider.js";

export default class ClientLoginController extends AbstractWebController implements IController {
    private clientProvider: ClientProvider;
    private view: View;

    constructor() {
        super();

        this.clientProvider = new ClientProvider();
        this.view = new View('login');
    }

    async getHandler(res: Response, req: Request): Promise<void> {
        this.view.setCsrfToken(req.session.csrfToken);

        if (req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }

        this.render(res, this.view, req.session.isLoggedIn);
    }

    async postHandler(res: Response, req: Request): Promise<void> {
        const params = req.body;

        try {
            const clientId = await this.clientProvider.clientLoginPost(params);

            req.session.isLoggedIn = true;
            req.session.userId = clientId;

            res.redirect('/user-profile');
        } catch (err: any) {
            this.redirectToError(res, err.message);
        }
    }
}