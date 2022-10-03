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

        res.render(masterView.getTemplate(), {
            'this': masterView,
            isLoggedIn: req.session.isLoggedIn
        });
    }

    async postHandler (res, req) {
        const params = req.body;

        const masterResource = new MasterResource();
        await masterResource.addNewMaster(params);

        res.redirect('/masters');
    }
}