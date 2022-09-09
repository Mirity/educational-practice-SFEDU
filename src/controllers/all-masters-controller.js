import MastersView from '../views/masters-view.js';
import Database from "../database.js";

export default class MastersController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        if (req.method === 'GET') {
            const masters = await connection.awaitQuery(`select * from master`);

            const mastersView = new MastersView();
            mastersView.setMasters(masters)

            res.render(mastersView.getTemplate(), { 'this': mastersView });
        } else {
            await connection.awaitQuery(
                `INSERT INTO master (name, surname, head_master_id, service_center_id) VALUES (?, ?, ?, ?)`,
                [req.body.name, req.body.surname, req.body.head_master, req.body.head_master]);
            res.redirect('/masters');
        }
    }
}