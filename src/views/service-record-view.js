export default class ServiceRecordView {
    template = 'service-record';
    serviceRecord = {
        id: 1,
        masterId: 1,
        carId: 1,
        clientId: 1,
        date: new Date('December 17, 1995 03:24:00'),
    }

    getServiceRecord() {
        return this.serviceRecord;
    }

    getTemplate() {
        return this.template;
    }
}

