import AbstractController from "./abstract-controller.js";
import MasterResource from "../models/resource/master-resource.js";
import { IController } from "../abstracts/common";

export default class DeleteMasterController extends AbstractController implements IController {
    public  async getHandler (res: any, req: any): Promise<void> {
        const masterResource = new MasterResource();
        await masterResource.deleteMaster(req.query.id);

        res.redirect('/masters');
    }
}