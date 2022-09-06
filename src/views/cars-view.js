export default class CarsView {
    template = 'cars';
    cars = [
        {
            id: 1,
            mileage: 12000,
            brandId: 1,
            model: 'X2',
            countryId: 1,
            clientId: 1,
            yearManufacture: 2001,
        },
        {
            id: 2,
            mileage: 10000,
            brandId: 1,
            model: 'X3',
            countryId: 2,
            clientId: 2,
            yearManufacture: 2011,
        },
        {
            id: 3,
            mileage: 11000,
            brandId: 2,
            model: 'X1',
            countryId: 3,
            clientId: 3,
            yearManufacture: 2021,
        },
    ];

    getCars() {
        return this.cars;
    }

    getTemplate() {
        return this.template;
    }
}
