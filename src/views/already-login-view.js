import AbstractView from "./abstract-view.js";

const template = 'already-login';

export default class AlreadyLoginView extends AbstractView{
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