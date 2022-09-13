import MasterView from '../views/master-view.js';
import Database from "../database.js";
import MastersView from "../views/masters-view.js";

export default class MasterController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.#getHandler(res, req);
        } else {
            await this.#postHandler(res, req);
        }
    }

    async #getHandler (res, req) {
        const master = await Database.makeQuery(`SELECT m1.id, m1.name, m1.surname, m2.name AS head_master_name, m2.surname AS head_master_surname, service_center.name AS service_center_name FROM master as m1 JOIN master AS m2 ON m2.id = m1.head_master_id JOIN service_center ON m1.service_center_id = service_center.id where m1.id='${req.query.id}'`);

        const masterView = new MasterView();
        masterView.setMaster(master)

        res.render(masterView.getTemplate(), { 'this': masterView });
    }

    async #postHandler (res, req) {
        const {name, surname, head_master_name, head_master_surname, service_center} = req.body;

        await Database.makeQuery(
            `INSERT INTO master (name, surname, head_master_id, service_center_id) VALUES (?, ?, (select id from (select id from master where name = '${head_master_name}' and surname = '${head_master_surname}') AS m2), (select id from service_center where name = '${service_center}'))`,
            [name, surname]);
        res.redirect('/masters');
    }
}