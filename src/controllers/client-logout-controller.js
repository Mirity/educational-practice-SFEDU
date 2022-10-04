import AbstractController from "./abstract-controller.js";

export default class ClientLogoutController extends AbstractController {
    async getHandler(res, req) {
        req.session.destroy();

        res.redirect('/cars')
    }
}