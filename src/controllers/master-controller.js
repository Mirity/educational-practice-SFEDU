import MasterView from '../views/master-view.js';
import Database from "../database.js";

export default class MasterController {
    async execute(req, res, next) {
        const connection = Database.getConnection();

        const master = await connection.awaitQuery(`select * from master where id=1`);

        const masterView = new MasterView();
        masterView.setMaster(master)

        res.render(masterView.getTemplate(), { 'this': masterView });
    }
}