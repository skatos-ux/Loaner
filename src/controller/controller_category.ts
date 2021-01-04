import DAOCategory from '../dao/dao_category';
import Controller from './controller';
import { Response } from 'express';

export default class CategoryController extends Controller {
    private dao = new DAOCategory();

    public async addCategory(res : Response, name : string) : Promise<void> {
        let lastId = 0;

        try {
            lastId = (await this.dao.getLastId()).getID();
        } catch {
            lastId = 0;
        }
        
        this.dao.addCategory(name, lastId+1).then(this.editSuccess(res)).catch(this.findError(res));
    }

    public async deleteCategory(res : Response, idCategory : string) : Promise<void> {
        this.dao.deleteCategory(idCategory).then(this.editSuccess(res)).catch(this.findError(res));
    }

    public async modifyCategory(res : Response, oldName : string, newName : string) : Promise<void> {
        this.dao.modifyCategory(oldName, newName).then(this.editSuccess(res)).catch(this.findError(res));
    }
}