import Controller from './controller';
import DAOUser from '../dao/dao_user';
import User from '../model/user'

import { Response } from 'express';

export default class UserController extends Controller {

    private dao = new DAOUser();

    public async getAll(res : Response) : Promise<void> {
      this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getUser(res : Response, idUser : string) : Promise<void> {
      this.dao.getUser(idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async addUser(res : Response, user : User) : Promise<void> {
      var lastId = 1;
      var firstRes =  true;
      const promLastId = this.dao.getLastId().then(async () => {
          firstRes = false;
      }).catch((error) => {
          lastId = 0;
      });
      if(!firstRes){
          lastId = (await this.dao.getLastId()).getId();
      }
      user.setId(lastId+1);
      this.dao.addUser(user).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async updateUser(res : Response, user : User) : Promise<void> {
      this.dao.updateUser(user).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async deleteUser(res : Response, idUser : string) : Promise<void>{
        this.dao.deleteUser(idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getUserHistory(res : Response, idUser : string) : Promise<void>{
        this.dao.getUserHistory(idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }
}
