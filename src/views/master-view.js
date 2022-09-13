import AbstractView from "./abstract-view.js";

const template = 'master';


export default class MasterView extends AbstractView{
    constructor() {
        super(template);
        this.master = {};
    }

    setMaster(master) {
        this.master = master;
    }

    getMaster() {
        return this.master[0];
    }
}