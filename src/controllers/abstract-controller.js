import url from "url";
import { nanoid } from 'nanoid'


export default class AbstractController {
    async execute(req, res, next) {
        if(req.session.csrfToken === undefined) {
            req.session.csrfToken = nanoid(15);
        }

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

    redirectToError(res, textError) {
        res.redirect(url.format({
            pathname: "/error",
            query: {
                textError: textError
            }
        }));
    }

    escapeHtml (value) {
        const entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return String(value).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }
}