import MastersView from '../views/masters-view.js';
import MasterResource from "../models/resource/master-resource.js";

export default class MastersController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res)
        }
    }

    async #getHandler (res) {
        const masterResource = new MasterResource();
        const masters = masterResource.getMasters();

        const mastersView = new MastersView();
        mastersView.setMasters(masters)

        res.render(mastersView.getTemplate(), { 'this': mastersView });
    }
}