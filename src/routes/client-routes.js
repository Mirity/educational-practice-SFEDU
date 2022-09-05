import express from 'express';
import ClientController from '../controllers/client-controller.js';

const clientController = new ClientController();
const router = express.Router();
const path = '/client';

router.get(`${path}/name`, clientController.routeClientByName);
router.get(`${path}/passport`, clientController.routeClientByPassport);

export default router;
