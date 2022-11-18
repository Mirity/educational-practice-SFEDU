import {DbServiceRecord, ServiceRecord} from "../abstracts/service-record";
import ServiceRecordEntity from "../models/entity/service-record-entity.js";



export default class ServiceRecordConverter {
    public static convertDbServiceRecord ({ id, date, number, passport, client_name, client_surname }: DbServiceRecord): ServiceRecord {
        return {
            id,
            date: date.toDateString(),
            number,
            passport,
            clientName: client_name,
            clientSurname: client_surname
        }
    }

    public static convertDbServiceRecords(dbServiceRecords: DbServiceRecord[]): ServiceRecord[] {
        return dbServiceRecords.map(dbServiceRecord => this.convertDbServiceRecord(dbServiceRecord));
    }

    public static convertDbServiceRecordToEntity (dbServiceRecord: DbServiceRecord): ServiceRecordEntity {
        return new ServiceRecordEntity(
            this.convertDbServiceRecord(dbServiceRecord)
        )
    }

    public static convertDbServiceRecordsToEntities(dbServiceRecords: DbServiceRecord[]): ServiceRecordEntity[] {
        return dbServiceRecords.map(dbServiceRecord => this.convertDbServiceRecordToEntity(dbServiceRecord));
    }

    public static convertServiceRecordToEntity(serviceRecord: ServiceRecord): ServiceRecordEntity {
        return new ServiceRecordEntity(serviceRecord);
    }

    public static convertServiceRecordsToEntities(serviceRecords: ServiceRecord[]): ServiceRecordEntity[] {
        return serviceRecords.map(serviceRecord =>this.convertServiceRecordToEntity(serviceRecord));
    }
}