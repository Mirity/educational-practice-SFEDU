import AbstractController from "./abstract-controller.js";
import ErrorView from "../views/error-view.js";
import { IController } from "../abstracts/common";


export default class ErrorController extends AbstractController implements IController {
    public async getHandler (res: any, req: any): Promise<void> {
        const errorView = new ErrorView();
        errorView.setError(req.query.textError);

        this.render(res, errorView, req.session.isLoggedIn)
    }
}