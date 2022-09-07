export default class AbstractView {
    constructor() {
        this.data = [];
        this.template = '/';
    }
    getData() {
        return this.data;
    }

    getTemplate() {
        return this.template;
    }
}