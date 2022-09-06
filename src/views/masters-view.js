export default class MastersView {
    template = 'masters';
    masters = [
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

    getMasters() {
        return this.masters;
    }

    getTemplate() {
        return this.template;
    }
}
