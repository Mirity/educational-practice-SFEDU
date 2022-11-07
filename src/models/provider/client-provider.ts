import ClientResource from "../resource/client-resource.js";
import { Client } from "../../abstracts/client";
import bcrypt from "bcrypt";


export default class ClientProvider {
    private clientResource: ClientResource;

    constructor() {
        this.clientResource = new ClientResource();
    }

    public isCorrectUserId (userId: any): userId is number {
        return (Boolean(userId) && userId > 0);
    }

    public isLoggedInHandler(isLoggedIn: boolean | undefined, userId: number | undefined): userId is number {
        return (isLoggedIn || this.isCorrectUserId(userId));
    }

    async getClientInformation(isLoggedIn: boolean | undefined, userId: number | undefined): Promise<Client> {
        if (!this.isLoggedInHandler(isLoggedIn, userId)){
            throw new Error('Войдите, чтобы продолжить');
        }

        return await this.clientResource.getClientById(userId);
    }


    public async editClientInformation(params: Client): Promise<void> {
        try {
            await this.clientResource.editClient(params);
        } catch (err) {
            throw new Error('Неверно введены данные')
        }
    }

    public async clientLoginPost(params: Client): Promise<number> {
        const textError = 'Неправильный пароль или email';

        const client = await this.clientResource.getClientByEmail(params.email);

        if (!client) {
            throw new Error(textError);
        }

        const isCorrectPassword = await bcrypt.compare(params.password, client.password)

        if (!isCorrectPassword) {
            throw new Error(textError);
        }

        return client.id as number;
    }

    public async clientRegistration(params: Client) {
        params.password = await bcrypt.hash(params.password, 10);

        const client = await this.clientResource.getClientByEmail(params.email);

        if(client) {
            throw new Error('Пользователь с таким email уже существует');
        }

        try {
            await this.clientResource.addNewClient(params);
        } catch {
            throw new Error('Bad request');
        }
    }
}
