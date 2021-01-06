import DAOCategory from '../dao/dao_category';
import Controller from './controller';
import { Request, Response } from 'express';
import Category from '../model/category';
import AuthController from './controller_auth';

export default class CategoryController extends Controller {

    private dao = new DAOCategory();
    private auth = new AuthController();

    public async addCategory(req : Request, res : Response, name : string) : Promise<void> {
        try {
            if(this.auth.checkToken(req, res, true)) {
                
                if(!(await this.dao.hasCategoryWithName(name))) {
                    let lastId = 0;

                    try {
                        lastId = (await this.dao.getLastId()).getID();
                    } catch {
                        lastId = 0;
                    }

                    const category = new Category(lastId + 1, name);
                    
                    this.dao.addCategory(category).then(this.editSuccess(res)).catch(this.findError(res));
                } else {
                    throw new Error("Category name already exists");
                }
            }
        } catch (err) {
            this.giveError(err, res);
        }
    }

    public async modifyCategory(req : Request, res : Response, oldName : string, newName : string) : Promise<void> {
        if(this.auth.checkToken(req, res, true)) {
            try {

                if(oldName === newName) {
                    throw new Error("Old name can't be the equal to new name");
                }

                if(!(await this.dao.hasCategoryWithName(newName))) {
                    const category = await this.dao.getByName(oldName);

                    this.dao.modifyCategory(category.getID(), newName).then(this.editSuccess(res)).catch(this.findError(res));
                } else {
                    throw new Error("New name is already set for a category");
                }

            } catch (err) {
                this.giveError(err, res);
            }
        } 
    }

    public async deleteCategory(req : Request, res : Response, idCategory : string) : Promise<void> {

        try {
            if(this.auth.checkToken(req, res, true)) {

                let idCat = Number.parseInt(idCategory);

                if(Number.isNaN(idCat)) {
                    throw new Error("Category ID is not a number");
                }

                if(await this.dao.hasCategoryWithID(idCat)) {
                    this.dao.deleteCategory(idCat).then(this.editSuccess(res)).catch(this.findError(res));
                } else {
                    this.giveError(new Error("Invalid category ID"), res);
                }
            }
        } catch (err) {
            this.giveError(err, res);
        }
    }
}