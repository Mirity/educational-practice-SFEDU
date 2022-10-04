import View from "./view.js";

const template = 'error';

export default class ErrorView extends View {
    constructor() {
        super(template);
        this.error = null;
    }

    getError() {
        return this.error;
    }

    setError(error) {
        this.error = error;

        return this;
    }
}