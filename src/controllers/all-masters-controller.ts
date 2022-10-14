import MastersView from '../views/masters-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractController from "./abstract-controller.js";
import MasterConverter from "../converters/master-converter.js";
import { IController } from "../abstracts/common";

export default class MastersController extends AbstractController implements IController{
    public  async getHandler (res: any, req: any): Promise<void> {
        const masterResource = new MasterResource();
        const mastersDb = await masterResource.getMasters();

        const mastersView = new MastersView();
        mastersView
            .setMasters(MasterConverter.convertDbMasters(mastersDb))
            .setCsrfToken(req.session.csrfToken);

        this.render(res, mastersView, req.session.isLoggedIn)
    }
}