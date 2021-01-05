import DAO from './dao';
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
      const query = "UPDATE user SET firstname = ?, lastname = ?, mail = ?, admin = ? WHERE id = ?";
      return this.runQuery(query, [user.getFirstName(), user.getLastName(), user.getEmail(), user.isAdmin(), user.getId()]);
    }

    public deleteUser(idUser : string) : Promise<void> {
      return this.runQuery("DELETE FROM user WHERE id = ?", [idUser]);
    }

    public hasUserWithEmail(email : string) : Promise<boolean> {
      return this.getOneRow("SELECT * FROM user WHERE mail=?", [email]).then(() => { return true; }).catch(() => { return false; });
    }

    // Partie authentification
    public checkUser(email : string, password : string) : Promise<User> {
      return this.getOneRowNoCast("SELECT * FROM user WHERE mail=?", [email])
      .then((row) => {
        if(bcrypt.compareSync(password, row.password)) {
          return this.rowToModel(row);
        }
        
        throw new Error("Invalid password");
      });
    }

    public changePassword(email : string, newPassword : string) : Promise<void> {
      return this.runQuery("UPDATE user SET password=?, temporaryPassword=0 WHERE mail=?",
        [bcrypt.hashSync(newPassword, config.hashSaltRounds), email]);
    }
}
