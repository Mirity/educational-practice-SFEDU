import AbstractView from "./abstract-view.js";

export default class MasterView extends AbstractView{
    constructor() {
        super();
        this.template = 'master';

        this.data = {
            id: 1,
            name: 'Nikita',
            surname: 'Kravtsov',
            headMasterId: 1,
            serviceCenterId: 1,
        }
    }
}