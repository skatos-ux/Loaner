import Controller from './controller';
import DAODevice from '../dao/dao_device';

import { Response } from 'express';
import Device from '../model/device';

export default class DeviceController extends Controller {

    private dao = new DAODevice();

    // TODO : Faire avec la presentaiton de Nico
    public async getAll(res : Response) : Promise<void> {
        this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getInfoDevice(res : Response, idDevice : String) : Promise<void> {
        this.dao.getInfoDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async borrowDevice(res : Response, idDevice : String, idUser : String) : Promise<void> {
        this.dao.borrowDevice(idDevice, idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async addDevice(res: Response, device : Device) : Promise<void> {
        this.dao.addDevice(device).then(this.findSuccess(res)).catch(this.findError(res));
    }
}