export default class View {
    constructor(template) {
        this.template = template;
    }

    getTemplate() {
        return this.template;
    }

    setTemplate(template) {
        this.template = template;

        return this;
    }
}