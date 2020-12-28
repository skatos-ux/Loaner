import { DAO } from './dao';
import Reservation from '../model/reservation';

export default class DAOCatgeory extends DAO<Reservation> {

    public rowToModel(row: any): Reservation {
        return new Reservation(row.ID, row.refDevice, row.idUser, row.startDate, row.endDate, row.returnDate);
    }

    public getLastId() : Promise<Reservation>{
        return this.getOneRow('select * from reservation order by id DESC LIMIT 1');
    }

    public historyDevice(idDevice : string) : Promise<Reservation []> {
        return this.getAllRows('select * from reservation where refDevice=?', [idDevice]);
    }
    // ...
}