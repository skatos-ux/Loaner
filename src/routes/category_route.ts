import { Router } from 'express';
import { send } from 'process';
import CategoryController from '../controller/controller_category';
import Category from '../model/category';

const router = Router();
const controller = new CategoryController();

/*Catégories : /category - Milan
    Coté admin :
        - Ajouter des catégories    PUT /add/:nom_categorie (token dans le corps de la requête)
        - Modifier les catégories   POST /modify (token + informations sur le catégorie dans le corps de la requête)
        - Supprimer des catégories  DELETE /delete/:id_category (token dans le corps de la requête)
*/

router.get('/all', (req,res) => {
    controller.getAll(res);
}); 


router.put('/add/:name_Category', (req, res) => {
    const nameCategory = req.params.name_Category;
    controller.addCategory(res, nameCategory);
});

router.delete('/delete/:id_category', (req, res) => {
    const idCategory = req.params.id_category;
    controller.deleteCategory(res, idCategory);
});

export default router;