import MasterView from '../views/master-view.js';
import MasterResource from "../models/resource/master-resource.js";

export default class MasterController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const masterResource = new MasterResource();
        const id = req.query.id;

        if (!id || Number.isInteger(id) || id <= 0) {
            res.status(500)
                .send(`No id provided or id incorrect`);

            return;
        }

        const master = masterResource.getMasterById(id);

        const masterView = new MasterView();
        masterView.setMaster(master)

        res.render(masterView.getTemplate(), { 'this': masterView });
    }

    async #postHandler (res, req) {
        const masterResource = new MasterResource();
        await masterResource.postMaster(req);

        res.redirect('/masters');
    }
}