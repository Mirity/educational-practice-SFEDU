import AbstractView from "./abstract-view.js";

const template = 'user-profile';

export default class UserProfileView extends AbstractView{
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