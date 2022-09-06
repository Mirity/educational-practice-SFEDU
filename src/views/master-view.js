export default class MasterView {
    template = 'master';
    master = {
        id: 1,
        name: 'Nikita',
        surname: 'Kravtsov',
        headMasterId: 1,
        serviceCenterId: 1,
    }

    getMaster() {
        return this.master;
    }

    getTemplate() {
        return this.template;
    }
}