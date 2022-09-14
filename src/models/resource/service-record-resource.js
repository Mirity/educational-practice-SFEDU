import Database from "../../database.js";

export default class ServiceRecordResource {
    #selectQuery = `SELECT service_record.id, service_record.date, car.number, client.passport, client.name as client_name, client.surname as client_surname FROM service_record JOIN car ON car.id = service_record.car_id JOIN client on client.id = service_record.client_id`;

    async getServiceRecords() {
        return await Database.makeQuery(`${this.#selectQuery} GROUP BY service_record.id`);
    }

    async getServiceRecordById(id) {
        const serviceRecords = await Database.makeQuery(`${this.#selectQuery} WHERE service_record.id = '${id}' GROUP BY service_record.id`);

        return serviceRecords[0];
    }

    async addNewServiceRecord(queryParams) {
        const { car, client, date } = queryParams;

        await Database.makeQuery(
            `INSERT INTO service_record (car_id, client_id, date) VALUES ((select id from car where number='${car}'), (select id from client where passport='${client}'), ?)`,
            [date]);
    }
}