import DAO from './dao';
import Category from '../model/category';

export default class DAOCategory extends DAO<Category> {

    protected rowToModel(row: any): Category {
        return new Category(row.id, row.name);
    }

    public addCategory(category : Category) : Promise<void> {
        return this.runQuery("INSERT INTO category VALUES(?, ?)", [category.getID(), category.getName()]);
    }

    // Non utilisé
    public getAll() : Promise<Category[]> {
        return this.getAllRows("SELECT * FROM category");
    }

    public deleteCategory(idCategory : number) : Promise<void> {

        if(idCategory < 0) {
            throw new Error("Invalid category ID");
        }

        this.runQuery("DELETE FROM device WHERE idCategory = ?", [idCategory]);
        return this.runQuery("DELETE FROM category WHERE id = ?", [idCategory]);
    }

    public modifyCategory(id : number, newName : string) : Promise<void>{
        return this.runQuery('update category set name = ? where id = ?', [newName, id]);
    }

    public getLastId() : Promise<Category>{
        return this.getOneRow('SELECT * FROM category ORDER BY id DESC LIMIT 1');
    }

    public hasCategoryWithID(id : number) : Promise<boolean> {
        return this.hasRow("SELECT * FROM category WHERE id = ?", [id]);
    }

    public hasCategoryWithName(name : string) : Promise<boolean> {
        return this.hasRow("SELECT * FROM category WHERE name = ?", [name]);
    }

    public getByName(name: string) : Promise<Category> {
        return this.getOneRow("SELECT * FROM category WHERE name = ?", name).catch(() => { throw new Error("Invalid category name"); });
    }
}