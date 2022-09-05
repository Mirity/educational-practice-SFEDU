import * as path from "path";

export default class ServiceCenterController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/service-center', 'service-center.html'));
    }
}