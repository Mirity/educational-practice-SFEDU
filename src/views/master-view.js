import View from "./view.js";

const template = 'master';


export default class MasterView extends View {
    constructor() {
        super(template);
        this.master = null;
    }

    setMaster(master) {
        this.master = master;

        return this;
    }

    getMaster() {
        return this.master;
    }
}