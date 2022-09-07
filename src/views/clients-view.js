import AbstractView from "./abstract-view.js";

export default class ClientsView extends AbstractView{
    constructor() {
        super();
        this.template = 'clients';

        this.data = [
            {
                id: 1,
                name: 'Alisa',
                surname: 'Balackaya',
                passport: '123123'
            },
            {
                id: 2,
                name: 'Dima',
                surname: 'Vikulin',
                passport: '312345'
            },
            {
                id: 1,
                name: 'Sanya',
                surname: 'Butenko',
                passport: '321245'
            },
        ]
    }
}
