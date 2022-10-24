import CarResource from "../../models/resource/car-resource.js";
import CarConverter from "../../converters/car-converter.js";
import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import AbstractApiController from "./abstract-api-controller.js";



export default class CarsApiController extends AbstractApiController implements IController {
    public async getHandler(res: Response, req: Request): Promise<void> {
        const carResource = new CarResource();

        const carsDb = await carResource.getCars();

        if(!this.isCorrectData(carsDb)) {
            this.sendMessageJson(res, 'No catDb');

            return;
        }

        const cars = CarConverter.convertDbCars(carsDb);

        this.sendData(res, cars);
    }
}