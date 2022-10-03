import NeedToLoginView from "../views/need-to-login-view.js";
import AbstractController from "./abstract-controller.js";

export default class NeedToLoginController extends AbstractController {
    async getHandler (res, req) {
        const needToLoginView = new NeedToLoginView();

        res.render(needToLoginView.getTemplate(), {
            'this': needToLoginView,
            isLoggedIn: req.session.isLoggedIn
        });
    }
}