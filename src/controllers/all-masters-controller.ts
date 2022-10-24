import MastersView from '../views/masters-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractWebController from "./abstract-web-controller.js";
import MasterConverter from "../converters/master-converter.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class MastersController extends AbstractWebController implements IController{
    public  async getHandler(res: Response, req: Request): Promise<void> {
        const masterResource = new MasterResource();
        const mastersDb = await masterResource.getMasters();

        const mastersView = new MastersView();
        mastersView
            .setMasters(MasterConverter.convertDbMasters(mastersDb))
            .setCsrfToken(req.session.csrfToken);

        this.render(res, mastersView, req.session.isLoggedIn)
    }
}