import DAO from './dao';
import Device from '../model/device';
import DAOReservation from './dao_reservation';

export default class DAODevice extends DAO<Device> {

    // Non utilisé
    public rowToModel(row: any): Device {
        const device = new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        return device;
    }

    public async rowToModelAsync(row: any): Promise<Device> {
        const device = new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        const daoReservation = new DAOReservation();
        await daoReservation.getAllReservationsDevice(row.ref).then(reservations => {
            reservations.forEach(elementRes => {
                const startDate = elementRes.getStartDate();
                const endDate = elementRes.getEndDate();
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

    public borrowDevice(idDevice : string, idUser : string, lastId : number) : Promise<void> {
        // Pour améliorer ca avec SQLite : https://sqlite.org/lang_datefunc.html
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth()+1; 
        const yyyy = new String(today.getFullYear());
        let day = new String(dd);
        let month = new String(mm);
        if(dd<10) 
        {
            day = '0'.concat(dd.toString());
        }
        if(mm<10) 
        {
            month = '0'.concat(mm.toString());
        }
        const date = day+'/'+month+'/'+yyyy;
        return this.runQuery('insert into reservation values(?,?,?,?,?,?)',[lastId,idDevice,idUser,date,null,null]);
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