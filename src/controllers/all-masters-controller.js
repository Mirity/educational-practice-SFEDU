import MastersView from '../views/masters-view.js';
import Database from "../database.js";

export default class MastersController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        if (req.method === 'GET') {
            const masters = await connection.awaitQuery(`SELECT m1.id, m1.name, m1.surname, m2.name AS head_master_name, m2.surname AS head_master_surname, service_center.name AS service_center_name FROM master as m1 JOIN master AS m2 ON m2.id = m1.head_master_id JOIN service_center ON m1.service_center_id = service_center.id;`);

            const mastersView = new MastersView();
            mastersView.setMasters(masters)

            res.render(mastersView.getTemplate(), { 'this': mastersView });
        } else {
            await connection.awaitQuery(
                `INSERT INTO master (name, surname, head_master_id, service_center_id) VALUES (?, ?, (select id from (select id from master where name = '${req.body.head_master_name}' and surname = '${req.body.head_master_surname}') AS m2), (select id from service_center where name = '${req.body.service_center}'))`,
                [req.body.name, req.body.surname]);
            res.redirect('/masters');
        }
    }
}