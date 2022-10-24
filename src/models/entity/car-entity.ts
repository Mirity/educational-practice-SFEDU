import { Car } from "../../abstracts/car";

export default class CarEntity {
    private id?: number | string;
    private mileage: number | string;
    private number: string;
    private brandName: string;
    private model: string;
    private countryName: string;
    private clientName: string;
    private clientSurname: string;
    private yearManufacture: number | string;

    constructor({ id, mileage, number, brandName, model, countryName, clientName, clientSurname, yearManufacture }: Car) {
        this.id = id;
        this.mileage = mileage;
        this.model = model;
        this.number = number;
        this.brandName = brandName;
        this.countryName = countryName;
        this.clientSurname = clientSurname;
        this.clientName = clientName;
        this.yearManufacture = yearManufacture;
    }

    public getId(): number | string | undefined {
        return this.id;
    }

    public getMileage(): number | string {
        return this.mileage;
    }

    public getNumber(): string {
        return this.number;
    }

    public getModel(): string {
        return this.model;
    }

    public getBrandName():string {
        return this.brandName;
    }

    public getCountryName(): string {
        return this.countryName;
    }

    public getClientName(): string {
        return this.clientName;
    }

    public getClientSurname(): string {
        return  this.clientSurname;
    }

    public getYearManufacture(): number | string {
        return this.yearManufacture;
    }
}