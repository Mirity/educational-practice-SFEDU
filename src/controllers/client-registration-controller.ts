import ClientResource from "../models/resource/client-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import bcrypt from 'bcrypt';
import View from "../views/view.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class ClientRegistrationController extends AbstractWebController implements IController {
    async getHandler (res: Response, req: Request): Promise<void> {
        const view = new View('registration');
        view.setCsrfToken(req.session.csrfToken);

        if(req.session.isLoggedIn) {
            this.redirectToError(res, 'Вы уже вошли в свой профиль');

            return;
        }
        this.render(res, view, req.session.isLoggedIn);
    }

    async postHandler (res: Response, req: Request): Promise<void> {
        const params = req.body;

        params.password = await bcrypt.hash(params.password, 10);

        const clientResource = new ClientResource();
        const client = await clientResource.getClientByEmail(params.email);

        if(client) {
            this.redirectToError(res, 'Пользователь с таким email уже существует');

            return;
        }

        await clientResource.addNewClient(params);

        res.redirect('/login');
    }
}