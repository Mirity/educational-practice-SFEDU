export default class ServiceCenterView {
    template = 'service-center';
    serviceCenter = {
        id: 1,
        name: 'AutoKrutyak',
        countryId: 1,
        cityId: 1,
        street: 'Boob 2',
        house: 1,
        numberSeats: 12
    }

    getServiceCenter() {
        return this.serviceCenter;
    }

    getTemplate() {
        return this.template;
    }
}

