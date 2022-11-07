import AbstractWebController from "./abstract-web-controller.js";
import View from "../views/view.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ClientProvider from "../models/provider/client-provider.js";

export default class ClientRegistrationController extends AbstractWebController implements IController {
    private view: View;
    private clientProvider: ClientProvider;

    constructor() {
        super();

        this.clientProvider = new ClientProvider();
        this.view = new View('registration');
    }
    async getHandler (res: Response, req: Request): Promise<void> {
        this.view.setCsrfToken(req.session.csrfToken);

        if(req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }
        this.render(res, this.view, req.session.isLoggedIn);
    }

    async postHandler (res: Response, req: Request): Promise<void> {
        const params = req.body;

        try {
            await this.clientProvider.clientRegistration(params);

            res.redirect('/login');
        } catch (err: any) {
            this.redirectToError(res, err.message);
        }
    }
}