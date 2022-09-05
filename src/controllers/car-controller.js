import * as path from "path";

export default class CarController {
    execute(req, res, next) {
        res.sendFile(path.join(__dirname, 'views/car', 'car.html'));
    }
}