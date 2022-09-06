export default class CarView {
    template = 'car';
    car = {
            id: 1,
            mileage: 12000,
            brandId: 1,
            model: 'X2',
            countryId: 1,
            clientId: 1,
            yearManufacture: 2001,
        }

    getCar() {
        return this.car;
    }

    getTemplate() {
        return this.template;
    }
}
