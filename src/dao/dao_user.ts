import { DAO } from './dao';
import User from '../model/user';

export default class DAOUser extends DAO<User> {

    public rowToModel(row: any): User {
      return new User(row.id, row.firstname, row.lastname, row.email, row.admin, row.password);
    }

    public getAll() : Promise<User[]> {
      return this.getAllRows("SELECT * FROM user")
    }

    // (désolé Lilian, j'en avais besoin pour l'authentification)
    public checkUser(firstName : string, lastName : string, password : string) : Promise<User> {
      return this.getOneRow("SELECT * FROM user WHERE firstName=? AND lastName=? AND password=?", [firstName, lastName, password])
    }

    // ...
}
