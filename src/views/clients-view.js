import AbstractView from "./abstract-view.js";

const template = 'clients';


export default class ClientsView extends AbstractView{
    constructor() {
        super(template);
        this.clients = null;
    }

    setClients(clients) {
        this.clients = clients;
    }

    getClients() {
        return this.clients;
    }
}
