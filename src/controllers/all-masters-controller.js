import MastersView from '../views/masters-view.js';

export default class MastersController {
    execute(req, res, next) {
        const mastersView = new MastersView();

        res.render(mastersView.getTemplate(), { 'this': mastersView });
    }
}