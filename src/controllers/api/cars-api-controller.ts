import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import AbstractApiController from "./abstract-api-controller.js";
import { Car } from "../../abstracts/car";
import CarProvider from "../../models/provider/car-provider.js";


export default class CarsApiController extends AbstractApiController implements IController {
    private carProvider: CarProvider;

    constructor() {
        super();

        this.carProvider = new CarProvider();
    }

    public async getHandler(res: Response, req: Request): Promise<void> {
        let cars: Car[];

        try {
            cars = await this.carProvider.getCars();

            this.sendData<Car[]>(res, cars);
        } catch(err: any) {
            this.sendErrorMessageJson(res, err.message);
        }
    }
}