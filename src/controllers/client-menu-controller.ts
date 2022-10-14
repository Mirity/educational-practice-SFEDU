import AbstractController from "./abstract-controller.js";
import View from "../views/view.js";
import { IController } from "../abstracts/common";

export default class ClientMenuController extends AbstractController implements IController {
    async getHandler(res: any, req: any): Promise<void> {
        const view = new View('client-menu');

        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        this.render(res, view, req.session.isLoggedIn)
    }
}