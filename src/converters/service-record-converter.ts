import { DbServiceRecord, ServiceRecord } from "../abstracts/service-record";

export default class ServiceRecordConverter {
    public static convertDbServiceRecord ({id, date, number, passport, client_name, client_surname}: DbServiceRecord): ServiceRecord {
        return {
            id,
            date,
            number,
            passport,
            clientName: client_name,
            clientSurname: client_surname
        }
    }

    public static convertDbServiceRecords(dbServiceRecords: DbServiceRecord[]): ServiceRecord[] {
        return dbServiceRecords.map(this.convertDbServiceRecord);
    }

}