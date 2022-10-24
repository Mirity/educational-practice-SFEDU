import ClientInformationView from "../views/client-information-view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class ClientInformationController extends AbstractWebController implements IController{
    async getHandler (res: Response, req: Request): Promise<void> {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const clientInformationView = new ClientInformationView();
        const clientResource = new ClientResource();

        const userId = req.session.userId;

        if(!this.isCorrectId(userId)) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        const client = await clientResource.getClientById(userId);
        clientInformationView
            .setClient(client)
            .setCsrfToken(req.session.csrfToken);

        this.render(res, clientInformationView, req.session.isLoggedIn)
    }

    async postHandler(res: any, req: any): Promise<void> {
        const params = req.body;

        const clientResource = new ClientResource();

        try {
            await clientResource.editClient(params);
        } catch (err) {
            this.redirectToError(res, 'Неверно введены данные', 400);

            return;
        }

        res.redirect('/user-profile');
    }
}