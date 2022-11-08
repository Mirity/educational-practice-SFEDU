import AbstractWebController from "./abstract-web-controller.js";
import View from "../views/view.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class ClientMenuController extends AbstractWebController implements IController {
    private view: View;

    constructor() {
        super();

        this.view = new View('client-menu');
    }

    async getHandler(res: Response, req: Request): Promise<void> {
        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        this.render(res, this.view, req.session.isLoggedIn)
    }
}