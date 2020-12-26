import { DAO } from './dao';
import Device from '../model/device';
import Category from '../model/category';

// TODO : A retirer et aller chercher les catégories depuis la BDD
const stubCategory = new Category(1, "Test");

export default class DAODevice extends DAO<Device> {

    public rowToModel(row: any): Device {
        return new Device(row.ref, stubCategory, row.name, row.version, row.photo, row.phone);
    }

    public getAll() : Promise<Device[]> {
        return this.getAllRows("SELECT * FROM device");
    }

    public getInfoDevice(idDevice : String) : Promise<Device> {
        return this.getOneRow("SELECT * FROM device where ref='"+idDevice+"'");
    }

    public borrowDevice(idDevice : String, idUser : String) : Promise<void>{
        //return this.runQuery('insert into device values(?,?,?,?,?,?)',['a',2,'a','a','a',2]);
        
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = new String(today.getFullYear());
        var day = new String(dd);
        var month = new String(mm);
        if(dd<10) 
        {
            day = '0'.concat(dd.toString());
        }
        if(mm<10) 
        {
            month = '0'.concat(mm.toString());
        }
        var date = day+'/'+month+'/'+yyyy;
        return this.runQuery('insert into reservation values(?,?,?,?,?,?)',[null,idDevice,idUser,date,null,null]);
    }
}