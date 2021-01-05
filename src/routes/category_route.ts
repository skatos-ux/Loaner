import { Router } from 'express';
import CategoryController from '../controller/controller_category';
import AuthController from '../controller/controller_auth';

const router = Router();
const controller = new CategoryController();
const controllerAuth = new AuthController();

router.put('/add/:name_Category', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)){
        const nameCategory = req.params.name_Category;
        controller.addCategory(res, nameCategory);
    }
});

router.delete('/delete/:id_category', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)){
        const idCategory = req.params.id_category;
        controller.deleteCategory(res, idCategory);
    }
});

router.post('/modify', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)){
        const names = req.body;
        controller.modifyCategory(res, names.oldName, names.newName);
    }
});

export default router;