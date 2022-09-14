import AbstractView from "./abstract-view.js";

const template = 'client';

export default class ClientView extends AbstractView{
    constructor() {
        super(template);
        this.client = null;
    }

    setClient(client) {
        this.client = client;

        return this;
    }

    getClient() {
        return this.client;
    }
}
