export default class ClientView {
    template = 'client';
    client = {
        id: 1,
        name: 'Alisa',
        surname: 'Balackaya',
        passport: '123123'
    }

    getClient() {
        return this.client;
    }

    getTemplate() {
        return this.template;
    }
}
