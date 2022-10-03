import AlreadyLoginView from "../views/already-login-view.js";
import AbstractController from "./abstract-controller.js";

export default class AlreadyLoginController extends AbstractController {
    async getHandler (res, req) {
        const alreadyLoginView = new AlreadyLoginView();

        res.render(alreadyLoginView.getTemplate(), {
            'this': alreadyLoginView,
            isLoggedIn: req.session.isLoggedIn
        });
    }
}