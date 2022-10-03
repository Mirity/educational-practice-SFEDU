import AbstractView from "./abstract-view.js";

const template = 'registration';

export default class RegistrationView extends AbstractView{
    constructor() {
        super(template);
        this.data = null;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;

        return this;
    }
}