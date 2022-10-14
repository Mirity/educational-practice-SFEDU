import Database from "../../database.js";
import { DbServiceRecord, ServiceRecordFromForm } from "../../abstracts/service-record";

export default class ServiceRecordResource {
    private getServiceRecordsQuery = `SELECT service_record.id, service_record.date, car.number, client.passport, client.name as client_name, client.surname as client_surname FROM service_record JOIN car ON car.id = service_record.car_id JOIN client on client.id = service_record.client_id`;

    public async getServiceRecords(): Promise<DbServiceRecord[]> {
        return Database.makeQuery(`${this.getServiceRecordsQuery} GROUP BY service_record.id`, null);
    }

    public async getServiceRecordById(id: number): Promise<DbServiceRecord | undefined> {
        const serviceRecords = await Database.makeQuery(`${this.getServiceRecordsQuery} WHERE service_record.id = '${id}' GROUP BY service_record.id`, null);

        return serviceRecords[0];
    }

    public async getServiceRecordsByClientId(id: number): Promise<DbServiceRecord[]> {
        return Database.makeQuery(`${this.getServiceRecordsQuery} WHERE client.id = '${id}' GROUP BY service_record.id`, null);
    }

    public async addNewServiceRecord(params: ServiceRecordFromForm): Promise<void> {
        const { car, client, date } = params;

        await Database.makeQuery(
            `INSERT INTO service_record (car_id, client_id, date) VALUES ((select id from car where number='${car}'), (select id from client where passport='${client}'), ?)`,
            [date]);
    }

    public async deleteServiceRecord(id: number) {
        await Database.makeQuery(`DELETE FROM service_record WHERE id = ${id}`, null);
    }
}