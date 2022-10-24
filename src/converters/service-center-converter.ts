import { DbServiceCenter } from "../abstracts/service-center";
import ServiceCenterEntity from "../models/entity/service-center-entity.js";

export default class ServiceCenterConverter {
    public static convertDbServiceCenter ({ id, name, street, house, number_seats, country_name, city_name }: DbServiceCenter): ServiceCenterEntity {
        return new ServiceCenterEntity({
            id,
            name,
            street,
            house,
            numberSeats: number_seats,
            countryName: country_name,
            cityName: city_name
        })
    }

    public static convertDbServiceCenters(dbServiceCenters: DbServiceCenter[]): ServiceCenterEntity[] {
        return dbServiceCenters.map(this.convertDbServiceCenter);
    }

}