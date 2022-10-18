import AbstractController from "./abstract-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";
import View from "../views/view.js";


export default class Controller404 extends AbstractController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const view = new View('404');

        res
            .status(404)
            .render(view.getTemplate(), {
                'this': view, isLoggedIn:
                req.session.isLoggedIn
        });
    }
}