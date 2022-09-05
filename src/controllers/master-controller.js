import * as path from "path";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class MasterController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, '../views/master', 'master.html'));
    }

    routeMasterByName (req, res, next) {
        res.send(`Master by name`);
    }

    routeMasterBySurname (req, res, next) {
        res.send(`Master by passport`);
    }
}