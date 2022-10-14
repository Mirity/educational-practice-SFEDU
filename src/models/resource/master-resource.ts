import Database from "../../database.js";
import { DbMaster, MasterFromForm } from "../../abstracts/master";

export default class MasterResource {
    private getMastersQuery = `SELECT m1.id, m1.name, m1.surname, m2.name AS head_master_name, m2.surname AS head_master_surname, service_center.name AS service_center_name FROM master as m1 JOIN master AS m2 ON m2.id = m1.head_master_id JOIN service_center ON m1.service_center_id = service_center.id`;

    public async getMasters(): Promise<DbMaster[]> {
        return Database.makeQuery(this.getMastersQuery, null);
    }

    public async getMasterById(id: number): Promise<DbMaster | undefined> {
        const masters =  await Database.makeQuery(`${this.getMastersQuery} where m1.id='${id}'`, null);

        return masters[0];
    }

    public async addNewMaster(params: MasterFromForm): Promise<void> {
        const { name, surname, head_master_name, head_master_surname, service_center } = params;

        await Database.makeQuery(
            `INSERT INTO master (name, surname, head_master_id, service_center_id) VALUES (?, ?, (select id from (select id from master where name = '${head_master_name}' and surname = '${head_master_surname}') AS m2), (select id from service_center where name = '${service_center}'))`,
            [name, surname]);
    }

    public async deleteMaster(id: number): Promise<void> {
        await Database.makeQuery(`DELETE FROM master WHERE id = ${id}`, null);
    }
}