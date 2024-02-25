import {ObjectId} from "mongodb";
import {SecurityRepositories} from "../repositories/security-repository";
import {injectable} from "inversify";

@injectable()
export class SecurityService  {
    constructor(protected securityRepositories:SecurityRepositories){}
    async createDevice(device: any): Promise<ObjectId | boolean> {
        return  await this.securityRepositories.createDevice(device)
    }
}