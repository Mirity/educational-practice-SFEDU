export default class AbstractView {
    constructor(template) {
        this.template = template;
    }

    getTemplate() {
        return this.template;
    }
}