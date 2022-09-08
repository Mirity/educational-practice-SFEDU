import AbstractView from "./abstract-view.js";

const template = 'masters';


export default class MastersView extends AbstractView{
    constructor() {
        super(template);

        this.masters = [
            {
                id: 1,
                name: 'Nikita',
                surname: 'Kravtsov',
                headMasterId: 1,
                serviceCenterId: 1,
            },
            {
                id: 2,
                name: 'Danya',
                surname: 'Klets',
                headMasterId: 1,
                serviceCenterId: 2,
            },
            {
                id: 3,
                name: 'Ivan',
                surname: 'Ivanov',
                headMasterId: 2,
                serviceCenterId: 3,
            },
        ]
    }

    getMasters() {
        return this.masters;
    }
}
