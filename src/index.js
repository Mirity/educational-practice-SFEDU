import App from './App.js'
import ClientRouter from "./routers/client-router.js";
import MasterRouter from "./routers/master-router.js";
import CarRouter from "./routers/car-router.js";
import ServiceCenterRouter from "./routers/service-center-router.js";
import ServiceRecordRouter from "./routers/service-record-router.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = new App();

const clientRouter = new ClientRouter();
const masterRouter = new MasterRouter();
const carRouter = new CarRouter();
const serviceCenterRouter = new ServiceCenterRouter();
const serviceRecordRouter = new ServiceRecordRouter();

app.initRouter(clientRouter.createRouters());
app.initRouter(masterRouter.createRouters());
app.initRouter(carRouter.createRouters());
app.initRouter(serviceCenterRouter.createRouters());
app.initRouter(serviceRecordRouter.createRouters());

app.listen(3020);
