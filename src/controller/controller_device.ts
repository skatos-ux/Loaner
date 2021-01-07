import Controller from './controller';
import DAODevice from '../dao/dao_device';
import DAOReservation from '../dao/dao_reservation';

import { Request, Response } from 'express';
import Device from '../model/device';
import DAOCategory from '../dao/dao_category';
import Category from '../model/category';
import Reservation from '../model/reservation';
import AuthController from './controller_auth';

export default class DeviceController extends Controller {

    private dao = new DAODevice();
    private daoReservation = new DAOReservation();
    private daoCategory = new DAOCategory();
    private auth = new AuthController();

    private async mapToCategories(devices : Device[]) : Promise<Category[]> {

        const categories: Category[] = await this.daoCategory.getAll();

        devices.forEach((device: Device) => {

            const cat = categories.find((value: Category) => {
                return value.getID() == device.getCategoryID();
            });

            cat?.addDevice(device);
        });

        return categories;
    }

    public async getAll(req : Request, res : Response) : Promise<void> {
        try {
            if(this.auth.checkToken(req, res)) {
                this.dao.getAll().then(devices => {
                    this.mapToCategories(devices).then(this.findSuccess(res)).catch(this.findError(res));
                }).catch(this.findError(res));
            }
        } catch (err) {
            this.giveError(err, res);
        }
    }

    public async getInfoDevice(req : Request, res : Response, refDevice : string) : Promise<void> {
        try {
            if(this.auth.checkToken(req, res)) {
                if(await this.dao.hasDeviceWithRef(refDevice)) {
                    this.dao.get(refDevice).then(this.findSuccess(res)).catch(this.findError(res));
                } else {
                    throw new Error("Invalid device reference");
                }
            }
        } catch (err) {
            this.giveError(err, res);
        }
    }

    public async borrowDevice(req : Request, res : Response, idDevice : string, idUser : string, startDate : Date, endDate : Date) : Promise<void> {
        let lastId = 0;

        try {
            lastId = (await this.daoReservation.getLastId()).getID();
        } catch {
            lastId = 0;
        }

        try{
            if(startDate > endDate){
                throw new Error("Invalid Dates");
            }
            if(!(await this.daoReservation.hasReservationWithInfos(idDevice, startDate, endDate))){
                this.dao.borrowDevice(idDevice, idUser, lastId+1, startDate, endDate).then(this.editSuccess(res)).catch(this.findError(res));
            }else{
                throw new Error("Reservation already exists");
            }
        }catch(err) {
            this.giveError(err, res);
        }
    }

    public async addDevice(req : Request, res : Response, ref : string, categoryName : string, name : string, version : string,
        photo : string, phone: string) : Promise<void> {
        
        try {
            const cat = await this.daoCategory.getByName(categoryName);
            const device = new Device(ref, cat.getID(), cat.getName(), name, version, photo, phone)
            this.dao.addDevice(device).then(this.editSuccess(res)).catch(this.findError(res));
        } catch(err) {
            this.giveError(err, res);
        }
    }

    public async deleteDevice(req : Request, res : Response, idDevice : string) : Promise<void> {
        this.dao.deleteDevice(idDevice).then(this.editSuccess(res)).catch(this.findError(res));
    }

    public async historyDevice(req : Request, res : Response, idDevice : string) : Promise<void> {
        this.daoReservation.historyDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async filterDevice(req : Request, res : Response, params: any) {

        try {

            if(this.auth.checkToken(req, res)) {
                let name = "";
                let ref = "";
                let categoryID = -1;

                for(const param in params) {

                    const value = params[param];

                    if(param == "name") {
                        if(typeof value == "string") {
                            name = value;
                        } else {
                            throw new Error("'name' is not a string");
                        }
                    } else if(param == "ref") {
                        if(typeof value == "string") {
                            ref = value;
                        } else {
                            throw new Error("'ref' is not a string");
                        }
                    } else if(param == "category") {

                        if(typeof value == "string") {

                            const daoCat = new DAOCategory();
                            const d = await daoCat.getByName(value);
                            categoryID = d.getID();

                        } else {
                            throw new Error("'availability' is not a string");
                        }

                    } else {
                        throw new Error("Invalid parameter '" + param + "'");
                    }
                }

                this.dao.getDevicesByFilter(name, ref, categoryID).then(devices => {
                    this.mapToCategories(devices).then(this.findSuccess(res)).catch(this.findError(res));
                }).catch(this.findError(res));
            }

        } catch (err) {
            this.giveError(err, res);
        }
    }

    public async getCategoryByName(req : Request, res : Response, name : string) : Promise<void>{
        this.daoCategory.getByName(name).then(this.findSuccess(res)).catch(this.findError(res));
    }
}