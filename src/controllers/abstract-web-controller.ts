import { IController, IView } from "../abstracts/common";
import AbstractController from "./abstract-controller.js";
import { NextFunction, Request, Response } from "express";
import url from "url";
import { RequestMethod } from "../abstracts/common.js"
import uniqueString from "unique-string";

export default abstract class AbstractWebController extends AbstractController implements IController {

    public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {

        if(req.session.csrfToken === undefined) {
            req.session.csrfToken = uniqueString();
        }

        if (req.method.toLowerCase() === RequestMethod.get) {
            await this.getHandler(res, req);
        }

        if (req.method.toLowerCase() === RequestMethod.post) {
            if(!this.verifyCsrfToken(req.body.csrf_token, req.session.csrfToken)) {
                return this.redirectToError(res, 'Отказано в доступе', 403);
            }

            req.body = this.handleParamsXss(req.body)

            await this.postHandler(res, req);
        }
    }

    private verifyCsrfToken(formCsrfToken: string, sessionCsrfToken: string): boolean {
        return formCsrfToken === sessionCsrfToken;
    }

    public handleInvalidId (res: Response): void {
        res.status(500)
            .send(`No id provided or id incorrect`);
    }

    public render(res: Response, view: IView, isLoggedIn: boolean | undefined): void {
        res.render(view.getTemplate(), {
            'this': view,
            isLoggedIn: isLoggedIn
        });
    }

    public redirectToError(res: Response, textError: string, statusCode: number = 200): void {
        res
            .status(statusCode)
            .redirect(url.format({
                pathname: "/error",
                query: {
                    textError: textError
                }
            }));
    }
}
