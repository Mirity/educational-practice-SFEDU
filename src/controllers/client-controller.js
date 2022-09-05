import * as path from "path";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ClientController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, '../views/client', 'client.html'));
    }

    routeClientByName (req, res, next) {
        res.send(`Client by name`);
    }

    routeClientByPassport (req, res, next) {
        res.send(`Client by passport`);
    }
}