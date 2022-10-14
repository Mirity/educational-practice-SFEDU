import { DbMaster, Master } from "../abstracts/master";

export default class MasterConverter {
    public static convertDbMaster ({id, name, surname, head_master_name, head_master_surname, service_center_name}: DbMaster): Master {
        return {
            id,
            name,
            surname,
            headMasterName: head_master_name,
            headMasterSurname: head_master_surname,
            serviceCenterName: service_center_name
        }
    }

    public static convertDbMasters(dbMasters: DbMaster[]): Master[] {
        return dbMasters.map(this.convertDbMaster);
    }

}