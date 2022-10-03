import MyRecordsView from "../views/my-records-view.js";
import ServiceRecordResource from "../models/resource/service-record-resource.js";
import AbstractController from "./abstract-controller.js";


export default class MyRecordsController extends AbstractController {
    async getHandler (res, req) {
        if(req.session.isLoggedIn) {
            const serviceRecordResource = new ServiceRecordResource();
            const records = await serviceRecordResource.getServiceRecordsByClientId(req.session.userId.id);

            const myRecordsView = new MyRecordsView();
            myRecordsView.setMyRecords(records)

            res.render(myRecordsView.getTemplate(), {
                'this': myRecordsView,
                isLoggedIn: req.session.isLoggedIn
            });
        } else {
            res.redirect('/need-to-login');
        }
    }
}