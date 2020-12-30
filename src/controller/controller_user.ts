import Controller from './controller';
import DAOUser from '../dao/dao_user';
import User from '../model/user';

import { Response } from 'express';
import { generate as generatePassword } from 'generate-password';

export default class UserController extends Controller {

    private dao = new DAOUser();

    public async getAll(res : Response) : Promise<void> {
      this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getUser(res : Response, idUser : string) : Promise<void> {
      this.dao.getUser(idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async addUser(res : Response, user : User) : Promise<void> {
      
      // On vérifie si l'adresse mail n'existe pas deja
      if(await this.dao.hasUserWithemail(user.getEmail())) {
        this.giveError(new Error("User with this email already exists"), res);
        return;
      }

      /*var lastId = 1;
      var firstRes =  true;
      /*const promLastId = this.dao.getLastId().then(async () => {
          firstRes = false;
      }).catch((error) => {
          lastId = 0;
      });*/

      let lastId = 1;
      let firstRes = true;
      await this.dao.getLastId().then(() => firstRes = false).catch(() => lastId = 0);
      if(!firstRes){
          lastId = (await this.dao.getLastId()).getId();
      }
      user.setId(lastId+1);

      const password = generatePassword({ length: 10, numbers: true });
      
      this.dao.addUser(user, password).then(this.findSuccess(res)).catch(this.findError(res));
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
