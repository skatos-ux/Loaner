import { DAO } from './dao';
import Category from '../model/category';

export default class DAOCategory extends DAO<Category> {

    public rowToModel(row: any): Category {
        return new Category(row.id, row.name);
    }

    public addCategory(nameCategory : string, lastId : number) : Promise<void> {
        return this.runQuery("insert into category values(?, ?)", [lastId, nameCategory]);
    }

    public getAll() : Promise<Category[]> {
        return this.getAllRows("SELECT * FROM category");
    }

    public deleteCategory(idCategory : string) : Promise<void>{
        return this.runQuery("delete from category where id=?", [idCategory]);
    }

    public modifyCategory(oldName : string, newName : string) : Promise<void>{
        return this.runQuery('update category set name=? where name=?', [newName, oldName]);
    }

    public getLastId() : Promise<Category>{
        return this.getOneRow('select * from category order by id DESC LIMIT 1');
    }

    public getByName(name: string) : Promise<Category> {
        return this.getOneRow("SELECT * FROM category WHERE name=?", name).catch(() => { throw new Error("Invalid category name"); });
    }
}