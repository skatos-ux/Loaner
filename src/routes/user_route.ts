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


router.get("/all", (req, res) => {
  controller.getAll(res);
});

router.get("/:idUser", (req, res) => {
  const idUser = req.params.idUser;
  controller.getUser(res, idUser);
});

router.put("/add", (req, res) => {
  // TODO : A deplacer dans le controller
  const info = req.body;
  const user: User = new User(info.id, info.firstName, info.lastName, info.email, info.admin, info.temporaryPassword);
  controller.addUser(res, user);
});

router.post("/modify", (req, res) => {
  // TODO : A deplacer dans le controller
  const info = req.body;
  const user: User = new User(info.id, info.firstName, info.lastName, info.email, info.admin, info.temporaryPassword);
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
