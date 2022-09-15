export default class AbstractController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.getHandler(res, req);
        } else if (req.method === 'POST'){
            await this.postHandler(res, req);
        }
    }

    idHandler (id, res) {
        if (!this.isCorrectId(id)) {
            res.status(500)
                .send(`No id provided or id incorrect`);
        }

        return this.isCorrectId(id);
    }

    isCorrectId (id) {
        return (id && id > 0);
    }
}