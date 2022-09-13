import MastersView from '../views/masters-view.js';
import Database from "../database.js";

export default class MastersController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res)
        }
    }

    async #getHandler (res) {
        const masters = await Database.makeQuery(`SELECT m1.id, m1.name, m1.surname, m2.name AS head_master_name, m2.surname AS head_master_surname, service_center.name AS service_center_name FROM master as m1 JOIN master AS m2 ON m2.id = m1.head_master_id JOIN service_center ON m1.service_center_id = service_center.id;`);

        const mastersView = new MastersView();
        mastersView.setMasters(masters)

        res.render(mastersView.getTemplate(), { 'this': mastersView });
    }
}