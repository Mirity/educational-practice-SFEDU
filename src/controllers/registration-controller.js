import RegistrationView from "../views/registration-view.js";
import RegistrationResource from "../models/resource/registration-resource.js";
import AbstractController from "./abstract-controller.js";
import bcrypt from 'bcrypt';

export default class RegistrationController extends AbstractController {
    async getHandler (res, req) {
        const registrationView = new RegistrationView();

        if(req.session.isLoggedIn) {
            res.redirect('/already-login')
        } else {
            res.render(registrationView.getTemplate(), {
                'this': registrationView,
                isLoggedIn: req.session.isLoggedIn
            });
        }
    }

    async postHandler (res, req) {
        const params = req.body;
        params.password = await bcrypt.hash(params.password, 10);

        const registrationResource = new RegistrationResource();
        const clientId = await registrationResource.getClientByEmail(params);

        if(clientId) {
            res.redirect('/error-registration')
        } else {
            await registrationResource.addNewClient(params);

            res.redirect('/login');
        }
    }
}