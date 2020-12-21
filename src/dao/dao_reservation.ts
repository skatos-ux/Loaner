import { DAO } from './dao';
import Reservation from '../model/reservation';

export default class DAOCatgeory extends DAO<Reservation> {

    public rowToModel(row: any): Reservation {
        return new Reservation();
    }

    // ...
}