import { Router } from 'express';
import CategoryController from '../controller/controller_category';
import AuthController from '../controller/controller_auth';

const router = Router();
const controller = new CategoryController();

router.put('/add/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    controller.addCategory(req, res, categoryName);
});

router.post('/modify', (req, res) => {
    const names = req.body;
    controller.modifyCategory(req, res, names.oldName, names.newName);
});


router.delete('/delete/:id_category', (req, res) => {
    const idCategory = req.params.id_category;
    controller.deleteCategory(req, res, idCategory);
});

export default router;