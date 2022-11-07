import Database from "../../database.js";
import { DbServiceCenter, ServiceCenter } from "../../abstracts/service-center";
import {DbQueryInfo} from "mysql-await";

export default class ServiceCenterResource {
    private getServiceCentersQuery = `SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id `

    public async getServiceCenters(): Promise<DbServiceCenter[]> {
        return Database.makeQuery<DbServiceCenter[]>(`${this.getServiceCentersQuery} GROUP BY service_center.id`, null);
    }

    public async getServiceCenterById(id: number): Promise<DbServiceCenter | undefined> {
        const serviceCenters = await Database.makeQuery<DbServiceCenter[]>(`${this.getServiceCentersQuery} where service_center.id = ${id}`, null);

        return serviceCenters[0];
    }

    public async addNewServiceCenter(params: ServiceCenter): Promise<DbQueryInfo> {
        const { name, countryName, cityName, street, house, numberSeats } = params;

        return await Database.makeAddQuery(
            `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, (select id from country where name='${countryName}'), (select id from city where name='${cityName}'), ?, ?, ?)`,
            [name, street, house, numberSeats]);
    }

    public async deleteServiceCenter(id: number) {
        await Database.makeQuery(`DELETE FROM service_center WHERE id = ${id}`, null);
    }

    public async editServiceCenter(params: ServiceCenter) {
        const { id, name, countryName, cityName, street, house, numberSeats } = params;

        await Database.makeQuery(
            `UPDATE service_center SET name = ?, street = ?, house = ?, number_seats = ?, country_id = (select id from country where name='${countryName}'), city_id = (select id from city where name='${cityName}') WHERE id = ${id}`,
            [name, street, house, numberSeats]);
    }
}