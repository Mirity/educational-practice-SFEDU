import * as path from "path";

export default class MasterController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/master', 'master.html'));
    }

    routeMasterByName (req, res, next) {
        res.send(`Master by name`);
    }

    routeMasterBySurname (req, res, next) {
        res.send(`Master by surname`);
    }
}