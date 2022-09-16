import Database from "../../database.js";

export default class ServiceRecordResource {
    #getServiceRecordsQuery = `SELECT service_record.id, service_record.date, car.number, client.passport, client.name as client_name, client.surname as client_surname FROM service_record JOIN car ON car.id = service_record.car_id JOIN client on client.id = service_record.client_id`;

    async getServiceRecords() {
        return Database.makeQuery(`${this.#getServiceRecordsQuery} GROUP BY service_record.id`);
    }

    async getServiceRecordById(id) {
        const serviceRecords = await Database.makeQuery(`${this.#getServiceRecordsQuery} WHERE service_record.id = '${id}' GROUP BY service_record.id`);

        return serviceRecords[0];
    }

    async addNewServiceRecord(params) {
        const { car, client, date } = params;

        await Database.makeQuery(
            `INSERT INTO service_record (car_id, client_id, date) VALUES ((select id from car where number='${car}'), (select id from client where passport='${client}'), ?)`,
            [date]);
    }

    async deleteServiceRecord(id) {
        await Database.makeQuery(`DELETE FROM service_record WHERE id = ${id}`);
    }
}