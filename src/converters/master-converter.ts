import { DbMaster, Master } from "../abstracts/master";
import MasterEntity from "../models/entity/master-entity.js";

export default class MasterConverter {
    public static convertDbMaster ({ id, name, surname, head_master_name, head_master_surname, service_center_name }: DbMaster): Master {
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

    public static convertDbMasterToEntity (dbMaster: DbMaster): MasterEntity {
        return new MasterEntity(
            this.convertDbMaster(dbMaster)
        )
    }

    public static convertDbMastersToEntities(dbMasters: DbMaster[]): MasterEntity[] {
        return dbMasters.map(dbMaster => this.convertDbMasterToEntity(dbMaster));
    }

    public static convertMasterToEntity(master: Master): MasterEntity {
        return new MasterEntity(master);
    }

    public static convertMastersToEntities(masters: Master[]): MasterEntity[] {
        return masters.map(master =>this.convertMasterToEntity(master));
    }
}