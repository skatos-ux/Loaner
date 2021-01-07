import Controller from './controller';
import DAOUser from '../dao/dao_user';
import DAOReservation from '../dao/dao_reservation';
import User from '../model/user';
import AuthController from './controller_auth';

import { Request, Response } from 'express';
import { generate as generatePassword } from 'generate-password';

export default class UserController extends Controller {

  private dao = new DAOUser();
  private daoReservation = new DAOReservation();
  private auth = new AuthController();

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      if (this.auth.checkToken(req, res, true)) {
        this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
      }
    } catch (err) {
      this.giveError(err, res);
    }
  }

  public async getUser(req: Request, res: Response, userId: string): Promise<void> {
    try {
      if (this.auth.checkToken(req, res, true)) {
        this.dao.getUser(userId).then(this.findSuccess(res)).catch(this.findError(res));
      }
    } catch (err) {
      this.giveError(err, res);
    }
  }

  public async addUser(req: Request, res: Response, id: string, firstName: string, lastName: string, email: string, admin: boolean): Promise<void> {

    if (this.auth.checkToken(req, res, true)) {
      try {

        // On vérifie si l'ID n'existe pas deja
        if (!(await this.dao.hasUserWithId(id))) {
          const user = new User(id, firstName, lastName, email, admin);

          // On vérifie si l'adresse mail n'existe pas deja
          if (await this.dao.hasUserWithEmail(user.getEmail())) {
            this.giveError(new Error("User with this email already exists"), res);
            return;
          }

          // On génère le mot de passe
          const password = generatePassword({ length: 10, numbers: true });

          this.dao.addUser(user, password).then(() => {
            this.giveSuccess({
              user: user,
              password: password
            }, res);
          }).catch(this.findError(res));

        } else {
          this.giveError(new Error("User with this ID already exists"), res);
        }
      } catch (err) {
        this.giveError(err, res);
      }
    }
  }

  public async updateUser(req: Request, res: Response, id: string, firstName: string, lastName: string, email: string, admin: boolean): Promise<void> {

    if (this.auth.checkToken(req, res, true)) {
      try {

        // On vérifie si l'ID existe
        if (await this.dao.hasUserWithId(id)) {
          const user = new User(id, firstName, lastName, email, admin);

          // On vérifie si l'adresse mail n'existe pas deja (chez les autres utilisateurs)
          if (await this.dao.hasUserWithEmailExcept(user.getEmail(), user.getId())) {
            this.giveError(new Error("User with this email already exists"), res);
            return;
          }

          this.dao.updateUser(user).then(this.editSuccess(res)).catch(this.findError(res));

        } else {
          this.giveError(new Error("User with this ID doesn't exists"), res);
        }

      } catch (err) {
        this.giveError(err, res);
      }
    }
  }

  public async deleteUser(req: Request, res: Response, userId: string): Promise<void> {

    try {
      if (this.auth.checkToken(req, res, true)) {
        if (await this.dao.hasUserWithId(userId)) {
          this.dao.deleteUser(userId).then(this.editSuccess(res)).catch(this.findError(res));
        } else {
          this.giveError(new Error("User with this ID doesn't exists"), res);
        }
      }
    } catch (err) {
      this.giveError(err, res);
    }
  }

  public async getUserHistory(req: Request, res: Response, userId: string): Promise<void> {
    try {
      if (this.auth.checkToken(req, res, true)) {
        if (await this.dao.hasUserWithId(userId)) {
          this.daoReservation.getUserHistory(userId).then(this.findSuccess(res)).catch(this.findError(res));
        } else {
          this.giveError(new Error("User with this ID doesn't exists"), res);
        }
      }
    } catch (err) {
      this.giveError(err, res);
    }
  }
}