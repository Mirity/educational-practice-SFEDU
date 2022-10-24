import { ServiceCenter } from "../../abstracts/service-center";


export default class ServiceCenterEntity {
    private id: number | string | undefined;
    private name: string;
    private street: string;
    private house: number | string;
    private numberSeats: number | string;
    private countryName: string;
    private cityName: string;

    constructor({ id, name, street, house, numberSeats, countryName, cityName }: ServiceCenter) {
        this.id = id;
        this.name = name;
        this.street = street;
        this.house = house;
        this.numberSeats = numberSeats;
        this.countryName = countryName;
        this.cityName = cityName;
    }

    public getId(): number | string | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getHouse(): string | number {
        return this.house;
    }

    public getStreet(): string {
        return this.street;
    }

    public getNumberSeats(): string | number {
        return this.numberSeats;
    }

    public getCountryName(): string {
        return this.countryName;
    }

    public getCityName(): string {
        return this.cityName;
    }
}