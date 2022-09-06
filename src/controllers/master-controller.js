import MasterView from '../views/master-view.js';

export default class MasterController {
    execute(req, res, next) {
        const masterView = new MasterView();

        res.render(masterView.getTemplate(), { 'this': masterView });
    }
}