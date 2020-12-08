import Controller from './controller';
import DAODevice from '../dao/dao_device';

import { Response } from 'express';

export default class DeviceController extends Controller {

    private dao = new DAODevice();

    public async getAll(res : Response) : Promise<void> {
        this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }
}