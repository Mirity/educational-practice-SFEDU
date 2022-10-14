import View from "./view.js";
import { IView } from "../abstracts/common";


const template = 'error';

export default class ErrorView extends View implements IView {
    error: null | string = null;

    constructor() {
        super(template);
    }

    public getError(): null | string {
        return this.error;
    }

    public setError(error: string): this {
        this.error = error;

        return this;
    }
}