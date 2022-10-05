import AbstractController from "./abstract-controller.js";
import View from "../views/view.js";

export default class ClientMenuController extends AbstractController {
    async getHandler(res, req) {
        const view = new View();
        view.setTemplate('client-menu');

        if(!req.session.isLoggedIn) {
            this.redirectToError(res, 'Войдите, чтобы продолжить');

            return;
        }

        this.render(res, view, req.session.isLoggedIn)
    }
}