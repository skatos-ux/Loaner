import { Router } from 'express';

import UserController from '../controller/controller_user';

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

router.get("/all", (req, res) => {
  controller.getAll(res);
});


export default router;
