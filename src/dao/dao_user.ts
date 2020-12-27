import { db, DAO } from './dao';
import User from '../model/user';
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

    // ...
}
