import CarResource from "../../models/resource/car-resource.js";
import CarConverter from "../../converters/car-converter.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import AbstractApiController from "./abstract-api-controller.js";
import CarEntity from "../../models/entity/car-entity";


export default class CarApiController extends AbstractApiController implements IController {
    private carResource: CarResource;

    constructor() {
        super();

        this.carResource = new CarResource();
    }

    public async getHandler(res: Response, req: Request): Promise<void> {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        const carDb = await this.carResource.getCarById(id);

        if (!this.isCorrectData(carDb)) {
            this.sendErrorMessageJson(res, 'No catDb', 200);

            return;
        }

        const car = CarConverter.convertDbCar(carDb);

        this.sendData<CarEntity>(res, car);
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.carResource.addNewCar(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }

    public async putHandler(res: Response, req: Request) {
        const id = req.params.id;
        const params = {...req.body, id}

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        const carDb = await this.carResource.getCarById(id);

        if (!this.isCorrectData(carDb)) {
            this.sendErrorMessageJson(res, 'This id not found', 200);

            return;
        }

        try {
            await this.carResource.editCarById(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }

    public async deleteHandler(res: Response, req: Request) {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        const carDb = await this.carResource.getCarById(id);

        if (!this.isCorrectData(carDb)) {
            this.sendErrorMessageJson(res, 'This id not found', 200);

            return;
        }

        try {
            await this.carResource.deleteCar(id);

            this.sendMessageJson(res, 'Ok');
        } catch (err) {
            this.sendErrorMessageJson(res, 'Bad request', 400);
        }
    }
}