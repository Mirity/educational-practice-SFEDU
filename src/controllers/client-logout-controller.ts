import AbstractWebController from "./abstract-web-controller.js";
import { IController } from "../abstracts/common";
import { Request, Response } from "express";

export default class ClientLogoutController extends AbstractWebController implements IController {
    async getHandler(res: Response, req: Request): Promise<void> {
        req.session.destroy(function(){
            res.redirect('/cars')
        });
    }
}