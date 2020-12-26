import Controller from './controller';
import DAODevice from '../dao/dao_device';

import { Response } from 'express';

export default class DeviceController extends Controller {

    private dao = new DAODevice();

    public async getAll(res : Response) {
        this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getInfoDevice(res : Response, idDevice : String){
        this.dao.get(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async borrowDevice(res : Response, idDevice : String, idUser : String) {
        this.dao.borrowDevice(idDevice, idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }
}