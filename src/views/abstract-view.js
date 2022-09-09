export default class AbstractView {
    constructor(template) {
        this.template = template;
    }

    getTemplate() {
        return this.template;
    }

    setTemplate(template) {
        this.template = template;
    }
}