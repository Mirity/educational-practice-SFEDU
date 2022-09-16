import MastersView from '../views/masters-view.js';
import MasterResource from "../models/resource/master-resource.js";
import AbstractController from "./abstract-controller.js";

export default class MastersController extends AbstractController {
    async getHandler (res) {
        const masterResource = new MasterResource();
        const masters = await masterResource.getMasters();

        const mastersView = new MastersView();
        mastersView.setMasters(masters)

        res.render(mastersView.getTemplate(), { 'this': mastersView });
    }
}