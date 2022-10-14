import View from "./view.js";
import { Master } from "../abstracts/master";
import { IView } from "../abstracts/common";


const template: string = 'masters';


export default class MastersView extends View implements IView {
    masters: null | Master[] = null;

    constructor() {
        super(template);
    }

    public setMasters(masters: Master[]): this {
        this.masters = masters;

        return this;
    }

    public getMasters(): null | Master[] {
        return this.masters;
    }
}
