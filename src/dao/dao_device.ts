import { DAO } from './dao';
import Device from '../model/device';
import Category from '../model/category';

// TODO : A retirer et aller chercher les catégories depuis la BDD
const stubCategory = "Test";

export default class DAODevice extends DAO<Device> {

    // TODO : Gerer category + available
    public rowToModel(row: any): Device {
        return new Device(row.ref, stubCategory, row.name, row.version, row.photo, row.phone, false);
    }

    public getAll() : Promise<Device[]> {
        return this.getAllRows("SELECT * FROM device");
    }

    public get(idDevice : string) : Promise<Device> {
        return this.getOneRow("SELECT * FROM device where ref=?", idDevice);
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

    public addDevice(device : Device) : Promise<void>{
        return this.runQuery('insert into device values(?,?,?,?,?,?)',[device.getRef(), device.getCategory(), device.getName(), device.getVersion(), device.getPhoto(), device.getPhone()]);
    }

    public deleteDevice(idDevice : string) : Promise<void> {
        return this.runQuery('delete from device where id=?',[idDevice]);
    }

}