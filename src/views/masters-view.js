import View from "./view.js";

const template = 'masters';


export default class MastersView extends View {
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
