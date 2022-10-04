import MyInformationView from "../views/my-information-view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";
import url from "url";

export default class MyInformationController extends AbstractController {
    async getHandler (res, req) {
        if(!req.session.isLoggedIn) {
            res.redirect(url.format({
                pathname:"/error",
                query: {
                    "textError": "Войдите, чтобы продолжить"
                }
            }));

            return;
        }

        const myInformationView = new MyInformationView();
        const clientResource = new ClientResource();

        const client = await clientResource.getClientById(req.session.userId);
        myInformationView.setClient(client);

        this.render(res, myInformationView, req.session.isLoggedIn)
    }

    async postHandler(res, req) {
        const params = req.body;

        const clientResource = new ClientResource();
        await clientResource.editClient(params);

        res.redirect('/user-profile');
    }
}