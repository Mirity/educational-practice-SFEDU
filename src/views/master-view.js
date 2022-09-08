import AbstractView from "./abstract-view.js";

const template = 'master';


export default class MasterView extends AbstractView{
    constructor() {
        super(template);

        this.master = {
            id: 1,
            name: 'Nikita',
            surname: 'Kravtsov',
            headMasterId: 1,
            serviceCenterId: 1,
        }
    }

    getMaster() {
        return this.master;
    }
}