import MyCarsView from "../views/my-cars-view.js";
import CarResource from "../models/resource/car-resource.js";
import AbstractController from "./abstract-controller.js";


export default class MyCarsController extends AbstractController {
    async getHandler (res, req) {
        if(req.session.isLoggedIn) {
            const carResource = new CarResource();
            const cars = await carResource.getCarsByClientId(req.session.userId.id);

            const myCarsView = new MyCarsView();
            myCarsView.setMyCars(cars)

            res.render(myCarsView.getTemplate(), {
                'this': myCarsView,
                isLoggedIn: req.session.isLoggedIn
            });
        } else {
            res.redirect('/need-to-login');
        }
    }
}