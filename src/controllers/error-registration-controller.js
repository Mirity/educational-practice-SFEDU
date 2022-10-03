import ErrorRegistrationView from "../views/error-registration-view.js";
import AbstractController from "./abstract-controller.js";

export default class ErrorRegistrationController extends AbstractController {
    async getHandler (res, req) {
        const errorRegistrationView = new ErrorRegistrationView();

        if(req.session.isLoggedIn) {
            res.redirect('/already-login')
        } else {
            res.render(errorRegistrationView.getTemplate(), {
                'this': errorRegistrationView,
                isLoggedIn: req.session.isLoggedIn
            });
        }
    }
}