import DAO from './dao';
import Device from '../model/device';
import DAOReservation from './dao_reservation';
import Reservation from '../model/reservation';

export default class DAODevice extends DAO<Device> {

    private daoReservation = new DAOReservation();
    
    // Non utilisé
    protected rowToModel(row: any) : Device {
        const device = new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        return device;
    }

    protected async rowToModelAsync(row: any) : Promise<Device> {
        const device = new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        await this.daoReservation.getAllReservationsDevice(row.ref).then(reservations => {
            reservations.forEach(reservation => device.addLockDays(reservation.getLockDays()));
        });
        return device;
    }

    public getAll() : Promise<Device[]> {
        return this.getAllRowsNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id").then(async (rows) => {
                const promises: Promise<Device>[] = rows.map(this.rowToModelAsync.bind(this));
                return Promise.all(promises);
            });
    }

    public get(refDevice : string) : Promise<Device> {
        return this.getOneRowNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND d.ref=?", refDevice).then(row => { return this.rowToModelAsync.bind(this)(row); });
    }

    public async borrowDevice(reservations : Reservation[]) : Promise<void[]> {
        const promises = reservations.map(reservation => {
            return this.runQuery('INSERT INTO reservation VALUES(?,?,?,?,?,?)',[reservation.getID(), reservation.getDevice(), reservation.getUserID(),
                Reservation.convertDate(reservation.getStartDate()), Reservation.convertDate(reservation.getEndDate()),
                (reservation.hasReturnDate()) ? Reservation.convertDate(reservation.getReturnDate()) : null]);
        });

        return Promise.all(promises);
    }

    public addDevice(device : Device) : Promise<void> {
        return this.runQuery('INSERT INTO device VALUES(?,?,?,?,?,?)',[device.getRef(), device.getCategoryID(), device.getName(), device.getVersion(), device.getPhoto(), device.getPhone()]);
    }

    public deleteDevice(refDevice : string) : Promise<void> {
        return this.runQuery('DELETE FROM device WHERE ref = ?', [refDevice]);
    }

    public getDevicesByFilter(name: string, ref: string, categoryID: number) : Promise<Device[]> {

        if(name == "" && ref == "" && categoryID == -1) {
            return Promise.reject(new Error("All fields can't be empty"));
        }

        const sqlWhens = [];
        const params = [];

        if(name != "") {
            sqlWhens.push("d.name = ?");
            params.push(name);
        }

        if(ref != "") {
            sqlWhens.push("d.ref = ?");
            params.push(ref);
        }

        if(categoryID != -1) {
            sqlWhens.push("d.idCategory = ?");
            params.push(categoryID);
        }


        return this.getAllRowsNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND " + sqlWhens.join(" AND ")
            , params).then(async (rows) => {
                const promises: Promise<Device>[] = rows.map(this.rowToModelAsync.bind(this));
                return Promise.all(promises);
            });
    }

    public hasDeviceWithRef(ref: string) : Promise<boolean> {
        return this.hasRow("SELECT * FROM device WHERE ref = ?", [ref]);
    }
}