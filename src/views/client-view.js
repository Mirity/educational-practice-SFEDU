import AbstractView from "./abstract-view.js";

export default class ClientView extends AbstractView{
    constructor() {
        super();
        this.template = 'client';

        this.data = {
            id: 1,
            name: 'Alisa',
            surname: 'Balackaya',
            passport: '123123'
        }
    }
}
