import Database from "../../database.js";
import { DbServiceCenter, ServiceCenterFromForm } from "../../abstracts/service-center";

export default class ServiceCenterResource {
    private getServiceCentersQuery = `SELECT service_center.id, service_center.name, street, house, number_seats, country.name AS country_name, city.name AS city_name FROM service_center JOIN country ON country.id = service_center.country_id JOIN city ON city.id = service_center.city_id`

    public async getServiceCenters(): Promise<DbServiceCenter[]> {
        return Database.makeQuery(this.getServiceCentersQuery, null);
    }

    public async getServiceCenterById(id: number): Promise<DbServiceCenter | undefined> {
        const serviceCenters = await Database.makeQuery(`${this.getServiceCentersQuery} where service_center.id = '${id}'`, null);

        return serviceCenters[0];
    }

    public async addNewServiceCenter(params: ServiceCenterFromForm) {
        const { name, countryName, cityName, street, house, numberSeats } = params;

        await Database.makeQuery(
            `INSERT INTO service_center (name, country_id, city_id, street, house, number_seats) VALUES (?, (select id from country where name='${countryName}'), (select id from city where name='${cityName}'), ?, ?, ?)`,
            [name, street, house, numberSeats]);
    }
}