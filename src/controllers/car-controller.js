import * as path from "path";
import {fileURLToPath} from "url";
import {dirname} from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class CarController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, '../views/car', 'car.html'));
    }
}