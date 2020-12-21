import { DAO } from './dao';
import Category from '../model/category';

export default class DAOCatgeory extends DAO<Category> {

    public rowToModel(row: any): Category {
        return new Category(1, "test");
    }

    // ...
}