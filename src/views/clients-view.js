import AbstractView from "./abstract-view.js";

const template = 'clients';


export default class ClientsView extends AbstractView{
    constructor() {
        super(template);

        this.clients = [
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

    getClients() {
        return this.clients;
    }
}
