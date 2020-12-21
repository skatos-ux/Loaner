import { DAO } from './dao';
import User from '../model/user';

export default class DAOUser extends DAO<User> {

    public rowToModel(row: any): User {
        return new User();
    }

    // ...
}