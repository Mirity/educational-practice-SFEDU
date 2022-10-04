export default class AbstractController {
    async execute(req, res, next) {
        if (req.method === 'GET') {
            await this.getHandler(res, req);
        } else if (req.method === 'POST'){
            await this.postHandler(res, req);
        }
    }

    handleInvalidId (res) {
        res.status(500)
            .send(`No id provided or id incorrect`);
    }

    isCorrectId (id) {
        return (id && id > 0);
    }

    render(res, view, isLoggedIn) {
        res.render(view.getTemplate(), {
            'this': view,
            isLoggedIn: isLoggedIn
        });
    }
}