import express from 'express';
import MasterController from '../controllers/master-controller.js';

const masterController = new MasterController();
const router = express.Router();
const path = '/master';

router.get(`${path}/name`, masterController.routeMasterByName);
router.get(`${path}/surname`, masterController.routeMasterBySurname);

export default router;
