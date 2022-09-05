import App from './App.js'

import AllCarsController from './controllers/all-cars-conroller.js';
import CarController from './controllers/car-controller.js'
import MasterController from './controllers/master-controller.js'
import AllMastersController from './controllers/all-masters-controller.js'
import AllServiceCentersController from './controllers/all-service-centers-controller.js'
import ServiceCenterController from './controllers/service-center-controller.js'
import ServiceRecordController from './controllers/service-record-controller.js'
import AllServiceRecordsController from "./controllers/all-service-records-controller.js";
import ClientController from "./controllers/client-controller.js";
import AllClientsController from "./controllers/all-clients-controller.js";

import clientRoutes from "./routes/client-routes.js";
import masterRoutes from "./routes/master-routes.js";

const app = new App(3020);
const allCarsController = new AllCarsController();
const carController = new CarController();
const masterController = new MasterController();
const allMastersController = new AllMastersController();
const allServiceCentersController = new AllServiceCentersController();
const serviceCenterController = new ServiceCenterController();
const allServiceRecordsController = new AllServiceRecordsController();
const serviceRecordController = new ServiceRecordController();
const allClientsController = new AllClientsController();
const clientController = new ClientController();


app.getPage('/car', carController.execute.bind(carController));
app.getPage('/cars', allCarsController.execute.bind(allCarsController));
app.getPage('/master', masterController.execute.bind(masterController));
app.getPage('/masters', allMastersController.execute.bind(allMastersController));
app.getPage('/service_center', serviceCenterController.execute.bind(serviceCenterController));
app.getPage('/service_centers', allServiceCentersController.execute.bind(allServiceCentersController));
app.getPage('/service_record', serviceRecordController.execute.bind(serviceRecordController));
app.getPage('/service_records', allServiceRecordsController.execute.bind(allServiceRecordsController));
app.getPage('/client', clientController.execute.bind(clientController));
app.getPage('/clients', allClientsController.execute.bind(allClientsController));

app.routes(clientRoutes);
app.routes(masterRoutes);

