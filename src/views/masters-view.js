import AbstractView from "./abstract-view.js";

const template = 'masters';


export default class MastersView extends AbstractView{
    constructor() {
        super(template);
    }

    setMasters(masters) {
        this.masters = masters;
    }

    getMasters() {
        return this.masters;
    }
}
