import View from "./view.js";
import { Master } from "../abstracts/master";
import { IView } from "../abstracts/common";


const template = 'masters';


export default class MastersView extends View implements IView {
    masters: Master[] | null = null;

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
