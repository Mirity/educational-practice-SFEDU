import View from "./view.js";

const template = 'my-information';

export default class MyInformationView extends View{
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