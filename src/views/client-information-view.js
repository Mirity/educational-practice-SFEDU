import View from "./view.js";

const template = 'client-information';

export default class ClientInformationView extends View {
    constructor() {
        super(template);
        this.client = null;
    }

    getClient() {
        return this.client;
    }

    setClient(client) {
        this.client = client;

        return this;
    }
}