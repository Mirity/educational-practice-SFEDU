import AbstractController from "./abstract-controller.js";
import ErrorView from "../views/error-view.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";


export default class ErrorController extends AbstractController implements IController {
    public async getHandler (res: Response, req: Request): Promise<void> {
        const errorView = new ErrorView();
        errorView.setError(req.query.textError as string);

        this.render(res, errorView, req.session.isLoggedIn)
    }
}