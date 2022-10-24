import { Request, Response, NextFunction } from "express";
import { IController , EntityMap, DataFromForm } from "../abstracts/common.js";


export default abstract class AbstractController implements IController{
    public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {}

    abstract getHandler(res: Response, req: Request): void;

    public postHandler(res: Response, req: Request) {}

    public isCorrectId (id: any): id is number {
        return (Boolean(id) && id > 0);
    }

    public isCorrectData<T>(data: T | undefined): data is T {
        return Boolean(data);
    }

    private escapeHtml (value: string): string {
        const entityMap: EntityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        return String(value).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
        });
    }

    protected handleParamsXss(params: DataFromForm): DataFromForm {
        for(let key in params) {
            params[key] = this.escapeHtml(params[key]);
        }

        return params;
    }
}