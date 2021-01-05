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
  controller.getAll(req, res);
});

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  controller.getUser(req, res, userId);
});

router.put("/add", (req, res) => {
  const info = req.body;
  controller.addUser(req, res, info.id, info.firstName, info.lastName, info.email, info.admin);
});

router.post("/modify", (req, res) => {
  const info = req.body;
  controller.updateUser(req, res, info.id, info.firstName, info.lastName, info.email, info.admin);
});

router.delete("/delete/:userId", (req, res) => {
  const userId = req.params.userId;
  controller.deleteUser(req, res, userId);
});

router.get("/:userId/history", (req, res) => {
  const userId = req.params.userId;
  controller.getUserHistory(req, res, userId);
});

export default router;
