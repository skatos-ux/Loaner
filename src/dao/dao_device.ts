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
}