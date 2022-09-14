import AbstractView from "./abstract-view.js";

const template = 'masters';


export default class MastersView extends AbstractView{
    constructor() {
        super(template);
        this.masters = null;
    }

    setMasters(masters) {
        this.masters = masters;

        return this;
    }

    getMasters() {
        return this.masters;
    }
}
