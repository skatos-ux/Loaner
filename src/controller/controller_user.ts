import Controller from './controller';
import DAOUser from '../dao/dao_user';

import { Response } from 'express';

export default class UserController extends Controller {

    private dao = new DAOUser();

    public async getAll(res : Response) : Promise<void> {
      this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }
}
