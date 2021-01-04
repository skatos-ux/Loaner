import Controller from './controller';
import DAODevice from '../dao/dao_device';
import DAOReservation from '../dao/dao_reservation';

import { Response } from 'express';
import Device from '../model/device';
import DAOCategory from '../dao/dao_category';
import Category from '../model/category';

export default class DeviceController extends Controller {

    private dao = new DAODevice();
    private daoReservation = new DAOReservation();
    private daoCategory = new DAOCategory();

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

    public async getAll(res : Response) : Promise<void> {
        this.dao.getAll().then(devices => {
            this.mapToCategories(devices).then(this.findSuccess(res)).catch(this.findError(res));
        }).catch(this.findError(res));
    }

    public async getInfoDevice(res : Response, idDevice : string) : Promise<void> {
        this.dao.get(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async borrowDevice(res : Response, idDevice : string, idUser : string) : Promise<void> {
        let lastId = 0;
        
        try {
            lastId = (await this.daoReservation.getLastId()).getID();
        } catch {
            lastId = 0;
        }

        this.dao.borrowDevice(idDevice, idUser, lastId+1).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async addDevice(res : Response, ref : string, categoryName : string, name : string, version : string, photo : string, phone: string) : Promise<void> {
        
        try {
            const cat = await this.daoCategory.getByName(categoryName);
            const device = new Device(ref, cat.getID(), cat.getName(), name, version, photo, phone)
            this.dao.addDevice(device).then(this.findSuccess(res)).catch(this.findError(res));
        } catch(err) {
            this.giveError(err, res);
        }
    }

    public async deleteDevice(res : Response, idDevice : string) : Promise<void> {
        this.dao.deleteDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async historyDevice(res : Response, idDevice : string) : Promise<void> {
        this.daoReservation.historyDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async filterDevice(res : Response, params: any) {

        let name = "";
        let ref = "";
        let available = -1;
        let categoryID = -1;

        for(const param in params) {

            const value = params[param];

            if(param == "name") {
                if(typeof value == "string") {
                    name = value;
                } else {
                    this.giveError(new Error("'name' is not a string"), res);
                    return;
                }
            } else if(param == "ref") {
                if(typeof value == "string") {
                    ref = value;
                } else {
                    this.giveError(new Error("'ref' is not a string"), res);
                    return;
                }
            } else if(param == "availability") {
                if(typeof value == "string") {

                    if(value != "available" && value != "borrowed") {
                        this.giveError(new Error("Invalid value for '" + value + "' for 'availability'"), res);
                        return;
                    }

                    available = (value == "available") ? 1 : 0;

                } else {
                    this.giveError(new Error("'availability' is not a string"), res);
                    return;
                }
            } else if(param == "category") {

                if(typeof value == "string") {

                    const daoCat = new DAOCategory();

                    try {

                        const d = await daoCat.getByName(value);

                        categoryID = d.getID();

                    } catch(err) {
                        this.giveError(err, res);
                        return;
                    }

                } else {
                    this.giveError(new Error("'availability' is not a string"), res);
                    return;
                }

            } else {
                this.giveError(new Error("Invalid parameter '" + param + "'"), res);
                return;
            }
        }

        this.dao.getDevicesByFilter(name, ref, available, categoryID).then(devices => {
            this.mapToCategories(devices).then(this.findSuccess(res)).catch(this.findError(res));
        }).catch(this.findError(res));
    }

    public async getCategoryByName(res : Response, name : string) : Promise<void>{
        this.daoCategory.getByName(name).then(this.findSuccess(res)).catch(this.findError(res));
    }
}