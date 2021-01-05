import DAO from './dao';
import Device from '../model/device';
import DAOReservation from './dao_reservation';

export default class DAODevice extends DAO<Device> {

    private daoReservation = new DAOReservation();
    // Non utilisé
    public rowToModel(row: any): Device {
        const device = new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        return device;
    }

    public async rowToModelAsync(row: any): Promise<Device> {
        const device = new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        await this.daoReservation.getAllReservationsDevice(row.ref).then(reservations => {
            reservations.forEach(elementRes => {
                var startDate = elementRes.getStartDate();
                var endDate;
                if(elementRes.getReturnDate() == null){
                    endDate = elementRes.getEndDate();
                }else{
                    endDate = elementRes.getReturnDate();
                }
                device.addLockDays(startDate +','+endDate);
            });
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
        return this.getOneRowNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as category " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND d.ref=?", refDevice).then(row => { return this.rowToModelAsync.bind(this)(row); });
    }

    public async borrowDevice(idDevice : string, idUser : string, lastId : number, startDate : Date, endDate : Date) : Promise<void> {
        return this.runQuery('insert into reservation values(?,?,?,?,?,?)',[lastId,idDevice,idUser,startDate,endDate,null]);
    }

    public addDevice(device : Device) : Promise<void> {
        return this.runQuery('insert into device values(?,?,?,?,?,?)',[device.getRef(), device.getCategoryID(), device.getName(), device.getVersion(), device.getPhoto(), device.getPhone()]);
    }

    public deleteDevice(refDevice : string) : Promise<void> {
        return this.runQuery('delete from device where ref=?', [refDevice]);
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


        return this.getAllRowsNoCast("SELECT ref, d.name as name, version, photo, phone, c.name as category " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND " + sqlWhens.join(" AND ")
            , params).then(async (rows) => {
                const promises: Promise<Device>[] = rows.map(this.rowToModelAsync.bind(this));
                return Promise.all(promises);
            });
    }
}