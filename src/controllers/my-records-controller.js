import ServiceRecordsView from "../views/service-records-view.js";
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";
import url from "url";


export default class MyRecordsController extends AbstractController {
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


        const serviceRecordResource = new ServiceRecordResource();
        const records = await serviceRecordResource.getServiceRecordsByClientId(req.session.userId);

        const serviceRecordsView = new ServiceRecordsView();
        serviceRecordsView
            .setServiceRecords(records)
            .setTemplate('my-records');


        this.render(res, serviceRecordsView, req.session.isLoggedIn)
    }
}