import AbstractController from "./abstract-controller.js";
import MasterResource from "../models/resource/master-resource.js";

export default class DeleteMasterController extends AbstractController {
    async getHandler (res, req) {
        const masterResource = new MasterResource();
        await masterResource.deleteMaster(req.query.id);

        res.redirect('/masters');
    }
}