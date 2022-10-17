import View from "./view.js";
import { Master } from "../abstracts/master";
import { IView } from "../abstracts/common";


const template = 'master';


export default class MasterView extends View implements IView {
    master: Master | null = null;

    constructor() {
        super(template);
    }

    public setMaster(master: Master): this {
        this.master = master;

        return this;
    }

    public getMaster(): null | Master {
        return this.master;
    }
}