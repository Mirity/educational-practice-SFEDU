import AbstractView from "./abstract-view.js";

const template = 'client';

export default class ClientView extends AbstractView{
    constructor() {
        super(template);

        this.client = {
            id: 1,
            name: 'Alisa',
            surname: 'Balackaya',
            passport: '123123'
        }
    }

    getClient() {
        return this.client;
    }
}
