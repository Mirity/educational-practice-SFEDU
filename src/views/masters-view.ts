import View from "./view.js";
import { IView } from "../abstracts/common";
import MasterEntity from "../models/entity/master-entity.js";


const template = 'masters';


export default class MastersView extends View implements IView {
    masters: MasterEntity[] | null = null;

    constructor() {
        super(template);
    }

    public setMasters(masters: MasterEntity[]): this {
        this.masters = masters;

        return this;
    }

    public getMasters(): null | MasterEntity[] {
        return this.masters;
    }
}
