import Controller from './controller';
import DAODevice from '../dao/dao_device';
import DAOReservation from '../dao/dao_reservation';

import { Response } from 'express';
import Device from '../model/device';
import Reservation from '../model/reservation';
import DAOCategory from '../dao/dao_category';

export default class DeviceController extends Controller {

    private dao = new DAODevice();
    private DAOReservation = new DAOReservation();

    public async getAll(res : Response) : Promise<void> {
        this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getInfoDevice(res : Response, idDevice : string) : Promise<void> {
        this.dao.get(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async borrowDevice(res : Response, idDevice : string, idUser : string) : Promise<void> {
        let lastId = 0;
        
        try {
            lastId = (await this.DAOReservation.getLastId()).getID();
        } catch {
            lastId = 0;
        }

        this.dao.borrowDevice(idDevice, idUser, lastId+1).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async addDevice(res : Response, device : Device) : Promise<void> {
        this.dao.addDevice(device).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async deleteDevice(res : Response, idDevice : string) : Promise<void> {
        this.dao.deleteDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async historyDevice(res : Response, idDevice : string) : Promise<void> {
        this.DAOReservation.historyDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
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

        this.dao.getDevicesByFilter(name, ref, available, categoryID).then(this.findSuccess(res)).catch(this.findError(res));
    }
}