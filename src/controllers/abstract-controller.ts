//@ts-ignore
import uniqueString from 'unique-string';
import url from "url";
import {IController, RequestMethod, EntityMap, DataFromForm, IView, DataDb} from "../abstracts/common.js";


export default abstract class AbstractController implements IController{
    public async execute(req: any, res: any, next: any): Promise<void> {

        if(req.session.csrfToken === undefined) {
            req.session.csrfToken = uniqueString();
        }

        if (req.method.toLowerCase() === RequestMethod.get) {
            await this.getHandler(res, req);
        }

        if (req.method.toLowerCase() === RequestMethod.post) {
            if(!this.verifyCsrfToken(req.body.csrf_token, req.session.csrfToken)) {
                return this.redirectToError(res, 'Отказано в доступе');
            }

            req.body = this.handleParamsXss(req.body)

            await this.postHandler(res, req);
        }
    }

    abstract getHandler(res: any, req: any): void;

    public postHandler(res: any, req: any) {}

    public handleInvalidId (res: any): void {
        res.status(500)
            .send(`No id provided or id incorrect`);
    }

    public isCorrectId (id: number): boolean {
        return (Boolean(id) && id > 0);
    }

    public isCorrectData (data: DataDb | undefined): boolean {
        return data !== undefined;


    }

    public render(res: any, view: IView, isLoggedIn: boolean): void {
        res.render(view.getTemplate(), {
            'this': view,
            isLoggedIn: isLoggedIn
        });
    }

    public redirectToError(res: any, textError: string): void {
        res.redirect(url.format({
            pathname: "/error",
            query: {
                textError: textError
            }
        }));
    }

    private escapeHtml (value: string): string {
        const entityMap: EntityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return String(value).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }

    private verifyCsrfToken(formCsrfToken: string, sessionCsrfToken: string): boolean {
        return formCsrfToken === sessionCsrfToken;
    }

    private handleParamsXss(params: DataFromForm): DataFromForm {
        for(let key in params) {
            params[key] = this.escapeHtml(params[key]);
        }

        return params;
    }
}