import { IController } from "../../abstracts/common";
import { Request, Response } from "express";
import AbstractApiController from "./abstract-api-controller.js";
import { Car } from "../../abstracts/car";
import CarProvider from "../../models/provider/car-provider.js";


export default class CarApiController extends AbstractApiController implements IController {
    private carProvider: CarProvider;

    constructor() {
        super();

        this.carProvider = new CarProvider();
    }
    public async getHandler(res: Response, req: Request): Promise<void> {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        try {
            const car = await this.carProvider.getCarById(id);

            this.sendData<Car>(res, car);
        } catch(err: any) {
            this.sendErrorMessageJson(res, err.message);
        }
    }

    public async postHandler(res: Response, req: Request): Promise<void> {
        let params = req.body;

        try {
            await this.carProvider.postCar(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }

    public async putHandler(res: Response, req: Request) {
        const id = req.params.id;
        const params = {...req.body, id}

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        try {
            await this.carProvider.putCar(params);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }

    public async deleteHandler(res: Response, req: Request) {
        const id = req.params.id;

        if (!this.isCorrectId(id)) {
            this.sendErrorMessageJson(res, 'Invalid id');

            return;
        }

        try {
            await this.carProvider.deleteCar(id);

            this.sendMessageJson(res, 'Ok');
        } catch (err: any) {
            this.sendErrorMessageJson(res, err.message, 400);
        }
    }
}