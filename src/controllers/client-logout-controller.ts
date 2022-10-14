import AbstractController from "./abstract-controller.js";
import { IController } from "../abstracts/common";

export default class ClientLogoutController extends AbstractController implements IController {
    async getHandler(res: any, req: any): Promise<void> {
        req.session.destroy();

        res.redirect('/cars')
    }
}