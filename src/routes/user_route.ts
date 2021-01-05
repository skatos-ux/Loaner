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

 
 // TODO : check des tokens pour les fonctions admins

router.get("/all", (req, res) => {
  controller.getAll(res);
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  controller.getUser(res, userId);
});

router.put("/add", (req, res) => {
  const info = req.body;
  controller.addUser(res, info.id, info.firstName, info.lastName, info.email, info.admin);
  /*const user: User = new User(info.id, info.firstName, info.lastName, info.email, info.admin, info.temporaryPassword);
  controller.addUser(res, user);*/
});

router.post("/modify", (req, res) => {
  const info = req.body;
  controller.updateUser(res, info.id, info.firstName, info.lastName, info.email, info.admin);
  /*const user: User = new User(info.id, info.firstName, info.lastName, info.email, info.admin, info.temporaryPassword);
  controller.updateUser(res, user);*/
});

router.delete("/delete/:userId", (req, res) => {
  const userId = req.params.userId;
  controller.deleteUser(res, userId);
});

router.get("/:userId/history", (req, res) => {
  const userId = req.params.userId;
  controller.getUserHistory(res, userId);
});

export default router;
