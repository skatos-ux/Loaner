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

    public getUser(idUser : string){
      return this.getOneRow("SELECT * FROM user WHERE id=?", [idUser]);
    }

    public getLastId() : Promise<User>{
        return this.getOneRow('SELECT * FROM user ORDER BY id DESC LIMIT 1');
    }

    public addUser(user : User){
        return this.runQuery("INSERT INTO user VALUES(?,?,?,?,?,?)", [user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), user.isAdmin(), user.getPassword()]);
    }

    public updateUser(user : User){
      let query : string =  "UPDATE user SET firstname = ?, lastname = ?, email = ?, admin = ?, password = ?  WHERE id = ?";
      return this.runQuery(query, [user.getFirstName(), user.getLastName(), user.getEmail(), user.isAdmin(), user.getPassword(), user.getId()]);
    }

    public deleteUser(idUser : string){
      return this.runQuery("DELETE FROM user WHERE id = ?", [idUser]);
    }

    public getUserHistory(idUser : string){
      return this.runQuery("SELECT * FROM reservation WHERE iduser = ?", [idUser]);
    }
   // ...
}
