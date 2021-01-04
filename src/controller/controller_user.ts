import Controller from './controller';
import DAOUser from '../dao/dao_user';
import DAOReservation from '../dao/dao_reservation';
import User from '../model/user';

import { Response } from 'express';
import { generate as generatePassword } from 'generate-password';

export default class UserController extends Controller {

    private dao = new DAOUser();
    private daoReservation = new DAOReservation();

    public async getAll(res : Response) : Promise<void> {
      this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async getUser(res : Response, idUser : string) : Promise<void> {
      this.dao.getUser(idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async addUser(res : Response, user : User) : Promise<void> {
      
      // On vérifie si l'adresse mail n'existe pas deja
      if(await this.dao.hasUserWithEmail(user.getEmail())) {
        this.giveError(new Error("User with this email already exists"), res);
        return;
      }

      const password = generatePassword({ length: 10, numbers: true });
      
      this.dao.addUser(user, password).then(this.editSuccess(res)).catch(this.findError(res));
    }

    public async updateUser(res : Response, user : User) : Promise<void> {
      // Vérfier si l'utilisateur existe (avec son ID)
      // Verifier si le mail n'existe pas chez un autre utilisateur
      this.dao.updateUser(user).then(this.editSuccess(res)).catch(this.findError(res));
    }

    public async deleteUser(res : Response, idUser : string) : Promise<void> {
      // Vérfier si l'utilisateur existe (avec son ID)
      this.dao.deleteUser(idUser).then(this.editSuccess(res)).catch(this.findError(res));
    }

    public async getUserHistory(res : Response, idUser : string) : Promise<void> {
      // Vérfier si l'utilisateur existe (avec son ID)
      this.daoReservation.getUserHistory(idUser).then(this.findSuccess(res)).catch(this.findError(res));
    }
}
