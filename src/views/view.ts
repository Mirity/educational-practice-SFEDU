import { IView } from "../abstracts/common";

export default class View implements IView{
    template: string;
    csrfToken: string | null | undefined;

    constructor(template: string) {
        this.template = template;
        this.csrfToken = null;
    }

    public getTemplate(): string {
        return this.template;
    }

    public setTemplate(template: string): void {
        this.template = template;
    }

    public getCsrfToken(): string | null | undefined {
        return this.csrfToken;
    }

    public setCsrfToken(csrfToken: string | null | undefined): void {
        this.csrfToken = csrfToken;
    }
}