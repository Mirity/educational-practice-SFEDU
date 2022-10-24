import { DbServiceRecord } from "../abstracts/service-record";
import ServiceRecordEntity from "../models/entity/service-record-entity.js";

export default class ServiceRecordConverter {
    public static convertDbServiceRecord ({ id, date, number, passport, client_name, client_surname }: DbServiceRecord): ServiceRecordEntity {
        return new ServiceRecordEntity({
            id,
            date,
            number,
            passport,
            clientName: client_name,
            clientSurname: client_surname
        })
    }

    public static convertDbServiceRecords(dbServiceRecords: DbServiceRecord[]): ServiceRecordEntity[] {
        return dbServiceRecords.map(this.convertDbServiceRecord);
    }
}