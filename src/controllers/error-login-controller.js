import ErrorLoginView from "../views/error-login-view.js";
import AbstractController from "./abstract-controller.js";

export default class ErrorLoginController extends AbstractController {
    async getHandler (res, req) {
        const errorLoginView = new ErrorLoginView();

        if(req.session.isLoggedIn) {
            res.redirect('/already-login')
        } else {
            res.render(errorLoginView.getTemplate(), {
                'this': errorLoginView,
                isLoggedIn: req.session.isLoggedIn
            });
        }
    }
}