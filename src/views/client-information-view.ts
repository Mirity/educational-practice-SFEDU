import View from "./view.js";
import { Client } from "../abstracts/client";
import { IView } from "../abstracts/common";


const template = 'client-information';

export default class ClientInformationView extends View implements IView {
    client: null | Client= null;

    constructor() {
        super(template);
    }

    getClient(): null | Client {
        return this.client;
    }

    setClient(client: Client): this {
        this.client = client;

        return this;
    }
}