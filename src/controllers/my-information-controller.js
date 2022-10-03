import MyInformationView from "../views/my-information-view.js";
import ClientResource from "../models/resource/client-resource.js";
import AbstractController from "./abstract-controller.js";

export default class MyInformationController extends AbstractController {
    async getHandler (res, req) {
        if(req.session.isLoggedIn) {
            const myInformationView = new MyInformationView();
            const clientResource = new ClientResource();

            const client = await clientResource.getClientById(req.session.userId.id);
            myInformationView.setClient(client);

            res.render(myInformationView.getTemplate(), {
                'this': myInformationView,
                isLoggedIn: req.session.isLoggedIn
            });
        } else {
            res.redirect('/need-to-login');
        }
    }

    async postHandler(res, req) {
        const params = req.body;

        const clientResource = new ClientResource();
        await clientResource.editClient(params);

        res.redirect('/user-profile');
    }
}