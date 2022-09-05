import * as path from "path";

export default class AllServiceCentersController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/service-centers', 'service-centers.html'));
    }
}