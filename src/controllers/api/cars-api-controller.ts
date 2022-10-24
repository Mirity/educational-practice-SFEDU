import CarResource from "../../models/resource/car-resource.js";
import CarConverter from "../../converters/car-converter.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import AbstractApiController from "./abstract-api-controller.js";
import CarEntity from "../../models/entity/car-entity";



export default class CarsApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const carResource = new CarResource();

        const carsDb = await carResource.getCars();

        if(!this.isCorrectData(carsDb)) {
            this.sendErrorMessageJson(res, 'No catDb', 200);

            return;
        }

        const cars = CarConverter.convertDbCars(carsDb);

        this.sendData<CarEntity[]>(res, cars);
    }
}