import DAOCategory from '../dao/dao_category';
import Controller from './controller';
import { Response } from 'express';

export default class CategoryController extends Controller {
    private dao = new DAOCategory();

    public async getAll(res : Response) : Promise<void> {
        this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
    }
    public async addCategory(res : Response, name : String) : Promise<void> {
        this.dao.addCategory(name).then(this.findSuccess(res)).catch(this.findError(res));
    }

    public async deleteCategory(res : Response, idCategory : String) : Promise<void> {
        this.dao.deleteCategory(idCategory).then(this.findSuccess(res)).catch(this.findError(res));
    }
}