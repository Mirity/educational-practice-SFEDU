import AbstractController from "./abstract-controller.js";
import ErrorView from "../views/error-view.js";
export default class ErrorController extends AbstractController {
    async getHandler (res, req) {
        const errorView = new ErrorView();
        errorView.setError(req.query.textError);

        this.render(res, errorView, req.session.isLoggedIn)
    }
}