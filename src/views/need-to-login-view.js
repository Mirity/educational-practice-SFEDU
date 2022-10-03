import AbstractView from "./abstract-view.js";

const template = 'need-to-login';

export default class NeedToLoginView extends AbstractView{
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