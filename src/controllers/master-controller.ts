import MasterView from '../views/master-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import MasterConverter from "../converters/master-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class MasterController extends AbstractWebController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const masterResource = new MasterResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const masterDb = await masterResource.getMasterById(id);

        if(!this.isCorrectData(masterDb)) {
            res.redirect('/404')

            return;
        }

        const masterView = new MasterView();
        masterView.setMaster(MasterConverter.convertDbMaster(masterDb))

        this.render(res, masterView, req.session.isLoggedIn)
    }

    public async postHandler (res: Response, req: Request): Promise<void> {
        let params = req.body;

        const masterResource = new MasterResource();

        try {
            await masterResource.addNewMaster(params);
        } catch (err) {
            this.redirectToError(res, 'Неверно введены данные', 400);

            return;
        }

        res.redirect('/masters');
    }
}