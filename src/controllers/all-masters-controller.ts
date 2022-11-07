import MastersView from '../views/masters-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import MasterConverter from "../converters/master-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import MasterProvider from "../models/provider/master-provider.js";


export default class MastersController extends AbstractWebController implements IController{
    private masterProvider: MasterProvider;
    private mastersView: MastersView;

    constructor() {
        super();

        this.mastersView = new MastersView();
        this.masterProvider = new MasterProvider();
    }

    public  async getHandler(res: Response, req: Request): Promise<void> {
        try {
            const masters = await this.masterProvider.getMasters();

            this.mastersView
                .setMasters(MasterConverter.convertMastersToEntities(masters))
                .setCsrfToken(req.session.csrfToken);

            this.render(res, this.mastersView, req.session.isLoggedIn);
        } catch (err: any) {
            this.redirectToError(res, err.message);
        }
    }
}