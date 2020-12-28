import Controller from './controller';
import DAODevice from '../dao/dao_device';
import DAOReservation from '../dao/dao_reservation';

import { Response } from 'express';
import Device from '../model/device';
import Reservation from '../model/reservation';

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
        var lastId = 0;
        var firstRes =  true;
        try{
            lastId = (await this.DAOReservation.getLastId()).getID();
        }catch{
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
}