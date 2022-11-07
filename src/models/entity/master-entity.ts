import { Master } from "../../abstracts/master";

export default class MasterEntity {
    private id: undefined | number | string;
    private name: string;
    private surname: string;
    private headMasterName: string;
    private headMasterSurname: string;
    private serviceCenterName: string;

    constructor({ id, name, surname, headMasterName, headMasterSurname , serviceCenterName }: Master) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.headMasterName = headMasterName;
        this.headMasterSurname = headMasterSurname;
        this.serviceCenterName = serviceCenterName;
    }

    public getId(): number | string | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public getHeadMasterName(): string {
        return this.headMasterName;
    }

    public getHeadMasterSurname(): string {
        return this.headMasterSurname;
    }

    public getServiceCenterName(): string {
        return this.serviceCenterName;
    }
}