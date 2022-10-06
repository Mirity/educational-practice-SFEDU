import MasterView from '../views/master-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractController from "./abstract-controller.js";

export default class MasterController extends AbstractController {
    async getHandler (res, req) {
        const masterResource = new MasterResource();
        const id = req.query.id;

        if (!this.isCorrectId(id)) {
            return this.handleInvalidId(res);
        }

        const master = await masterResource.getMasterById(id);

        const masterView = new MasterView();
        masterView.setMaster(master)

        this.render(res, masterView, req.session.isLoggedIn)
    }

    async postHandler (res, req) {
        let params = req.body;

        if(!this.verifyCsrfToken(params.csrf_token, req.session.csrfToken)) {
            return this.redirectToError(res, 'Отказано в доступе');
        }

        params = this.handleParamsXss(params)

        const masterResource = new MasterResource();
        await masterResource.addNewMaster(params);

        res.redirect('/masters');
    }
}