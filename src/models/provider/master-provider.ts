import MasterResource from "../resource/master-resource.js";
import { Master } from "../../abstracts/master";
import MasterConverter from "../../converters/master-converter.js";


export default class MasterProvider {
    private masterResource: MasterResource;

    constructor() {
        this.masterResource = new MasterResource();
    }

    async getMasterById(id: number): Promise<Master> {
        const masterDb = await this.masterResource.getMasterById(id);

        if(!masterDb) {
            throw new Error('No master')
        }

        return MasterConverter.convertDbMaster(masterDb);
    }

    async getMasters(): Promise<Master[]> {
        const mastersDb = await this.masterResource.getMasters();

        if(!mastersDb) {
            throw new Error('No masters')
        }

        return MasterConverter.convertDbMasters(mastersDb);
    }

    public async postMaster(params: Master): Promise<void> {
        try {
            await this.masterResource.addNewMaster(params);
        } catch (err) {
            throw new Error('Bad request');
        }
    }

    public async deleteMaster(id: number) {
        try{
            await this.getMasterById(id);
        } catch {
            throw new Error('No service center')
        }

        try {
            await this.masterResource.deleteMaster(id);
        } catch (err) {
            throw new Error('Bad request');
        }
    }
}
