import { DbServiceCenter, ServiceCenter } from "../abstracts/service-center";

export default class ServiceCenterConverter {
    public static convertDbServiceCenter ({id, name, street, house, number_seats, country_name, city_name}: DbServiceCenter): ServiceCenter {
        return {
            id,
            name,
            street,
            house,
            numberSeats: number_seats,
            countryName: country_name,
            cityName: city_name
        }
    }

    public static convertDbServiceCenters(dbServiceCenters: DbServiceCenter[]): ServiceCenter[] {
        return dbServiceCenters.map(this.convertDbServiceCenter);
    }

}