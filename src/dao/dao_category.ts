import { DAO } from './dao';
import Category from '../model/category';

export default class DAOCategory extends DAO<Category> {

    public rowToModel(row: any): Category {
        return new Category(row.id, row.name);
    }

    public addCategory(nameCategory : string) {
        return this.runQuery("insert into category values(?, ?)", [1, nameCategory]);
    }

    public getAll() : Promise<Category[]> {
        return this.getAllRows("SELECT * FROM category");
    }

    public deleteCategory(idCategory : string) {
        return this.runQuery("delete from category where id=?", [idCategory]);
    }
}