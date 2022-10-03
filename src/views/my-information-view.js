import AbstractView from "./abstract-view.js";

const template = 'my-information';

export default class MyInformationView extends AbstractView{
    constructor() {
        super(template);
        this.data = null;
    }

    getClient() {
        return this.data;
    }

    setClient(data) {
        this.data = data;

        return this;
    }
}