export default class AllCarsController {
    text = 'cars';

    execute(req, res, next) {
        res.send(`All ${this.text} Controller`);
    }
}
