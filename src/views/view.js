export default class View {
    constructor(template) {
        this.template = template;
        this.csrfToken = null;
    }

    getTemplate() {
        return this.template;
    }

    setTemplate(template) {
        this.template = template;

        return this;
    }

    getCsrfToken() {
        return this.csrfToken;
    }

    setCsrfToken(csrfToken) {
        this.csrfToken = csrfToken;

        return this;
    }
}