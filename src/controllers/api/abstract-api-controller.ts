import { IController } from "../../abstracts/common";
import { NextFunction, Request, Response } from "express";
import { RequestMethod } from "../../abstracts/common.js"
import AbstractController from "../abstract-controller.js";


export default abstract class AbstractApiController extends AbstractController implements IController {
    public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.method.toLowerCase() === RequestMethod.get) {
            await this.getHandler(res, req);
        }

        if (req.method.toLowerCase() === RequestMethod.post) {
            req.body = this.handleParamsXss(req.body)

            await this.postHandler(res, req);
        }

        if(req.method.toLowerCase() == RequestMethod.put) {
            await this.putHandler(res, req);
        }

        if(req.method.toLowerCase() == RequestMethod.delete) {
            await this.deleteHandler(res, req)
        }
    }

    public putHandler(res: Response, req: Request) {}

    public deleteHandler(res: Response, req: Request) {}

    public sendErrorMessageJson(res: Response, errorMessage: string, statusCode: number = 500) {
        res
            .status(statusCode)
            .json({
                errorMessage
            })
    }

    public sendMessageJson(res: Response, message: string) {
        res.json({
            message
        })
    }

    public sendData<T>(res:Response, data: T) {
        res.json({
            data
        });
    }
}
