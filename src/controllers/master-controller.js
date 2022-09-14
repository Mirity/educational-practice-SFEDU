import MasterView from '../views/master-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractController from "./abstract-controller.js";

export default class MasterController extends AbstractController {
    async execute(req, res, next) {
        await super.execute(req, res, next);
    }

    async getHandler (res, req) {
        const masterResource = new MasterResource();
        const id = req.query.id;
        super.isCorrectId(id, res);

        const master = masterResource.getMasterById(id);

        const masterView = new MasterView();
        masterView.setMaster(master)

        res.render(masterView.getTemplate(), { 'this': masterView });
    }

    async postHandler (res, req) {
        const queryParams = req.body;

        const masterResource = new MasterResource();
        await masterResource.addNewMaster(queryParams);

        res.redirect('/masters');
    }
}