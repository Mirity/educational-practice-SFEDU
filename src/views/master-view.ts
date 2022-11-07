import View from "./view.js";
import { IView } from "../abstracts/common";
import MasterEntity from "../models/entity/master-entity.js";


const template = 'master';


export default class MasterView extends View implements IView {
    master: MasterEntity | null = null;

    constructor() {
        super(template);
    }

    public setMaster(master: MasterEntity): this {
        this.master = master;

        return this;
    }

    public getMaster(): null | MasterEntity {
        return this.master;
    }
}