import CarResource from "../../models/resource/car-resource.js";
import CarConverter from "../../converters/car-converter.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import AbstractApiController from "./abstract-api-controller.js";


export default class CarApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const carResource = new CarResource();
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return
        }

        const carDb = await carResource.getCarById(id);

        if (!this.isCorrectData(carDb)) {
            this.sendMessageJson(res, 'No catDb');

            return;
        }

        const car = CarConverter.convertDbCar(carDb);

        this.sendData(res, car);
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        const carResource = new CarResource();

        try {
            await carResource.addNewCar(params);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);

            return;
        }

        this.sendMessageJson(res, 'Ok');
    }

    public async putHandler(res: Response, req: Request) {
        let params = req.body;
        const id = req.params.id;
        params = {...params, id: id}

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return;
        }

        const carResource = new CarResource();
        const carDb = await carResource.getCarById(id);

        if (!this.isCorrectData(carDb)) {
            this.sendMessageJson(res, 'This id not found');

            return;
        }

        try {
            await carResource.editCarById(params);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);

            return;
        }

        this.sendMessageJson(res, 'Ok');
    }

    public async deleteHandler(res: Response, req: Request) {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendMessageJson(res, 'Invalid id', 500);

            return;
        }

        const carResource = new CarResource();
        const carDb = await carResource.getCarById(id);

        if (!this.isCorrectData(carDb)) {
            this.sendMessageJson(res, 'This id not found');

            return;
        }

        try {
            await carResource.deleteCar(id);
        } catch (err) {
            this.sendMessageJson(res, 'Bad request', 400);

            return;
        }

        this.sendMessageJson(res, 'Ok');
    }
}