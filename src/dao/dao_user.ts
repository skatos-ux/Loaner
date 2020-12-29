import { DAO } from './dao';
import User from '../model/user';
import * as config from '../../config.json';

import * as bcrypt from 'bcryptjs';

export default class DAOUser extends DAO<User> {

    public rowToModel(row: any): User {
      return new User(row.id, row.firstName, row.lastName, row.mail, row.admin === 1, row.temporaryPassword === 1);
    }

    public getAll() : Promise<User[]> {
      return this.getAllRows("SELECT * FROM user")
    }

    public getUser(idUser : string) : Promise<User> {
      return this.getOneRow("SELECT * FROM user WHERE id=?", [idUser]);
    }

    public getLastId() : Promise<User> {
        return this.getOneRow('SELECT * FROM user ORDER BY id DESC LIMIT 1');
    }

    public addUser(user : User, password : string) : Promise<void> {
        return this.runQuery("INSERT INTO user VALUES(?,?,?,?,?,?,?)", [user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(),
          user.isAdmin(), bcrypt.hashSync(password, config.hashSaltRounds), true]);
    }

    public updateUser(user : User) : Promise<void> {
      const query = "UPDATE user SET firstname = ?, lastname = ?, email = ?, admin = ? WHERE id = ?";
      return this.runQuery(query, [user.getFirstName(), user.getLastName(), user.getEmail(), user.isAdmin(), user.getId()]);
    }

    public deleteUser(idUser : string) : Promise<void> {
      return this.runQuery("DELETE FROM user WHERE id = ?", [idUser]);
    }

    public getUserHistory(idUser : string) : Promise<void> {
      return this.runQuery("SELECT * FROM reservation WHERE iduser = ?", [idUser]);
    }

    public hasUserWithemail(email : string) : Promise<boolean> {
      return this.getOneRow("SELECT * FROM user WHERE email=?", [email]).then(() => { return true; }).catch(() => { return false; });
    }

    // Partie authentification
    public checkUser(firstName : string, lastName : string, password : string) : Promise<User> {
      return this.getOneRowNoCast("SELECT * FROM user WHERE firstName=? AND lastName=?", [firstName, lastName])
      .then((row) => {
        if(bcrypt.compareSync(password, row.password)) {
          return this.rowToModel(row);
        }
        
        throw new Error("Invalid password");
      });
    }

    public changePassword(firstName : string, lastName : string, newPassword : string) : Promise<void> {
      return this.runQuery("UPDATE user SET password=? WHERE firstName=? AND lastName=?",
        [bcrypt.hashSync(newPassword, config.hashSaltRounds), firstName, lastName])
        .then(() => { this.runQuery("UPDATE user SET temporaryPassword=0 WHERE firstName=? AND lastName=?", [firstName, lastName]); });
    }
}
