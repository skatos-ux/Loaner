import { DAO } from './dao';
import Device from '../model/device';

export default class DAODevice extends DAO<Device> {

    // TODO : Gerer les lockDays "reservation"
    // Besoin de laisser le champ available si on gère les réservations ?
    public rowToModel(row: any): Device {
        return new Device(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
    }

    public getAll() : Promise<Device[]> {
        return this.getAllRows("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id");
    }

    public get(refDevice : string) : Promise<Device> {
        return this.getOneRow("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as category " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND d.ref=?", refDevice);
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
        // Il faut mettre l'ID de la categorie et non pas le nom (device.getCategory() = nom)
        return this.runQuery('insert into device values(?,?,?,?,?,?)',[device.getRef(), device.getCategoryID(), device.getName(), device.getVersion(), device.getPhoto(), device.getPhone()]);
    }

    public deleteDevice(refDevice : string) : Promise<void> {
        return this.runQuery('delete from device where ref=?', [refDevice]);
    }

    public getDevicesByFilter(name: string, ref: string, available: number, categoryID: number) : Promise<Device[]> {

        if(name == "" && ref == "" && available == -1 && categoryID == -1) {
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

        // TODO : available

        if(categoryID != -1) {
            sqlWhens.push("d.idCategory = ?");
            params.push(categoryID);
        }


        return this.getAllRows("SELECT ref, d.name as name, version, photo, phone, c.name as category " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND " + sqlWhens.join(" AND ")
            , params);
    }
}