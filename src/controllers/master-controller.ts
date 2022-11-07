import MasterView from '../views/master-view.js';
import AbstractWebController from "./abstract-web-controller.js";
import MasterConverter from "../converters/master-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import MasterProvider from "../models/provider/master-provider.js";

export default class MasterController extends AbstractWebController implements IController {
    private masterProvider: MasterProvider;
    private masterView: MasterView;

    constructor() {
        super();

        this.masterView = new MasterView();
        this.masterProvider = new MasterProvider();
    }

    public async getHandler (res: Response, req: Request): Promise<void> {
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        try {
            const master = await this.masterProvider.getMasterById(id);

            this.masterView.setMaster(MasterConverter.convertMasterToEntity(master))

            this.render(res, this.masterView, req.session.isLoggedIn)
        } catch (err: any) {
            this.redirectToError(res, err.message, 404);
        }
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.masterProvider.postMaster(params);

            res.redirect('/masters');
        } catch (err: any) {
            this.redirectToError(res, err.message, 400);
        }
    }
}