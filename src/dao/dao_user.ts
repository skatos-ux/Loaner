import { DAO } from './dao';
import User from '../model/user';
import * as config from '../../config.json';

import * as bcrypt from 'bcryptjs';

export default class DAOUser extends DAO<User> {

    public rowToModel(row: any): User {
      return new User(row.id, row.firstname, row.lastname, row.email, row.admin);
    }

    public getAll() : Promise<User[]> {
      return this.getAllRows("SELECT * FROM user")
    }

    public checkUser(firstName : string, lastName : string, password : string) : Promise<User> {
      return this.getOneRowNoCast("SELECT * FROM user WHERE firstName=? AND lastName=?", [firstName, lastName])
      .then((row) => {
        if(bcrypt.compareSync(password, row.password)) {
          return this.rowToModel(row);
        }

        throw new Error("Invalid password");
      });
    }

    public getUser(idUser : string){
      return this.getOneRow("SELECT * FROM user WHERE id=?", [idUser]);
    }

    public getLastId() : Promise<User>{
        return this.getOneRow('SELECT * FROM user ORDER BY id DESC LIMIT 1');
    }

    public addUser(user : User, password : string){
        return this.runQuery("INSERT INTO user VALUES(?,?,?,?,?,?)", [user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(),
          user.isAdmin(), bcrypt.hashSync(password, config.hashSaltRounds)]);
    }

    public updateUser(user : User){
      let query : string =  "UPDATE user SET firstname = ?, lastname = ?, email = ?, admin = ? WHERE id = ?";
      return this.runQuery(query, [user.getFirstName(), user.getLastName(), user.getEmail(), user.isAdmin(), user.getId()]);
    }

    public deleteUser(idUser : string){
      return this.runQuery("DELETE FROM user WHERE id = ?", [idUser]);
    }

    public getUserHistory(idUser : string){
      return this.runQuery("SELECT * FROM reservation WHERE iduser = ?", [idUser]);
    }
   // ...
}
