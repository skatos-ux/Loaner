import DAO from './dao';
import Reservation from '../model/reservation';

export default class DAOReservation extends DAO<Reservation> {

    protected rowToModel(row: any): Reservation {
        return new Reservation(row.id, row.refDevice, row.idUser, row.startDate, row.endDate, row.returnDate);
    }

    public getLastId() : Promise<number> {
        return this.getOneRowNoCast('SELECT id FROM reservation ORDER BY id DESC LIMIT 1').then(row => { return row.id; }).catch(() => { return 1; });
    }

    public historyDevice(idDevice : string) : Promise<Reservation[]> {
        return this.getAllRows('SELECT * FROM reservation WHERE refDevice = ?', [idDevice]);
    }
    
    public getUserHistory(idUser : string) : Promise<Reservation[]> {
        return this.getAllRows("SELECT * FROM reservation WHERE idUser = ?", [idUser]);
    }

    public getAllReservationsDevice(ref : string) : Promise<Reservation[]>{
        return this.getAllRows("SELECT * FROM reservation WHERE refDevice = ?", [ref]);
    }

    public hasReservationWithInfos(refDevice : string, startDate : Date, endDate : Date) : Promise<boolean> {
        /*return this.hasRow("SELECT * FROM reservation WHERE refDevice = ? AND startDate <= ? AND endDate >= ?",
            [refDevice, endDate, startDate]);*/
        return this.hasRow("SELECT * FROM reservation WHERE refDevice = ? AND startDate <= ? AND endDate >= ?",
            [refDevice, Reservation.convertDate(endDate), Reservation.convertDate(startDate)]);
    }
}