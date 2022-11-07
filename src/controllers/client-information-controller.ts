import ClientInformationView from "../views/client-information-view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import ClientProvider from "../models/provider/client-provider.js";

export default class ClientInformationController extends AbstractWebController implements IController{
    private clientProvider: ClientProvider;
    private clientInformationView: ClientInformationView;

    constructor() {
        super();

        this.clientProvider = new ClientProvider();
        this.clientInformationView = new ClientInformationView();
    }

    async getHandler (res: Response, req: Request): Promise<void> {
        const userId = req.session.userId;

        try {
            const client = await this.clientProvider.getClientInformation(req.session.isLoggedIn, userId);

            this.clientInformationView
                .setClient(client)
                .setCsrfToken(req.session.csrfToken);

            this.render(res, this.clientInformationView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message);
        }

    }

    async postHandler(res: any, req: any): Promise<void> {
        const params = req.body;

        try {
            await this.clientProvider.editClientInformation(params);

            res.redirect('/user-profile');
        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}