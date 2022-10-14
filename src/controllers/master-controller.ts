import MasterView from '../views/master-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractController from "./abstract-controller.js";
import MasterConverter from "../converters/master-converter.js";
import { IController } from "../abstracts/common";

export default class MasterController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void> {
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

    public async postHandler (res: any, req: any): Promise<void> {
        let params = req.body;

        const masterResource = new MasterResource();
        await masterResource.addNewMaster(params);

        res.redirect('/masters');
    }
}