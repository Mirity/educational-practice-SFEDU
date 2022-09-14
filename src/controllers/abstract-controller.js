export default class AbstractController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.getHandler(res, req);
        } else if (req.method === 'POST'){
            await this.postHandler(res, req);
        }
    }

    isCorrectId (id, res) {
        if (!id || Number.isInteger(id) || id <= 0) {
            res.status(500)
                .send(`No id provided or id incorrect`);

            return;
        }
    }
}