import AbstractView from "./abstract-view.js";

const template = 'my-cars';


export default class MyCarsView extends AbstractView {
    constructor() {
        super(template);
        this.myCars = null;
    }

    setMyCars(myCars) {
        this.myCars = myCars;

        return this;
    }

    getMyCars() {
        return this.myCars;
    }
}
