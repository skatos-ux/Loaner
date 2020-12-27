import { Router } from 'express';
import UserController from '../controller/controller_user';
import User from '../model/user'

const router = Router();
const controller = new UserController();
// Utilisateurs : /users - Lilian
 // Coté admin :
 //    - Liste de tous les utilisateurs    GET /all
 //    - Obtenir les informations d'un utilisateur (pas sur)     GET /:id_utilisateur
 //    - Ajouter un utilisateur            PUT /add (informations de l'utilisateur dans le corps de la requête)
 //    - Modifier un utilisateur           POST /modify (informations de l'utilisateur dans le corps de la requête)
 //    - Supprimer un utilisateur          DELETE /delete/:id_utilisateur
 //    - Historique des emprunts pour un utilisateur   GET /:id_utilisateur/history

// ...

// a tester
router.get("/all", (req, res) => {
  controller.getAll(res);
});

//a tester
router.get("/:idUser", (req, res) => {
  const idUser = req.params.idUser;
  controller.getUser(res, idUser);
});

//a tester
router.post("/add", (req, res) => {
  const user : User = JSON.parse(req.body);
  controller.addUser(res, user);
});

//a tester
router.put("/modify", (req, res) => {
  const user : User = JSON.parse(req.body);
  controller.updateUser(res, user);
});

router.delete("/delete/:idUser", (req, res) => {
  const idUser = req.params.idUser;
  controller.deleteUser(res, idUser);
});

router.get("/:idUser/history", (req, res) => {
  const idUser = req.params.idUser;
  controller.getUserHistory(res, idUser);
});

export default router;
