import AbstractView from "./abstract-view.js";

const template = 'service-centers';


export default class ServiceCentersView extends AbstractView{
    constructor() {
        super(template);

        this.serviceCenters = [
            {
                id: 1,
                name: 'AutoKrutyak',
                countryId: 1,
                cityId: 1,
                street: 'Boob 2',
                house: 1,
                numberSeats: 12,
            },
            {
                id: 2,
                name: 'AutoRespect',
                countryId: 2,
                cityId: 2,
                street: 'Boob 3',
                house: 1,
                numberSeats: 13,
            },
            {
                id: 3,
                name: 'AutoDrumDrum',
                countryId: 3,
                cityId: 3,
                street: 'Boob 4',
                house: 2,
                numberSeats: 1,
            },
        ]
    }

    getServiceCenters() {
        return this.serviceCenters
    }
}

