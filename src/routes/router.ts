import express from 'express';
import device_route from './device_route';
import user_route from './user_route';
import category_route from './category_route';
import auth_route from './auth_route';

/*
Racine : /api

Utilisateurs : /users - Lilian
 Coté admin :
    - Liste de tous les utilisateurs    GET /all
    - Obtenir les informations d'un utilisateur (pas sur)     GET /:id_utilisateur
    - Ajouter un utilisateur            PUT /add (informations de l'utilisateur dans le corps de la requête)
    - Modifier un utilisateur           POST /modify (informations de l'utilisateur dans le corps de la requête)
    - Supprimer un utilisateur          DELETE /delete/:id_utilisateur
    - Historique des emprunts pour un utilisateur   GET /:id_utilisateur/history

Matériels : /devices - Milan / Yohan
    - Liste de tous les matériels   GET /all
    - Obtenir les informations d'un matériel (pas sur)     GET /:id_materiel
    - Filtrer une recherche de matériel selon un filtre (à voir si cummulable)  GET /all/nom_filtre/:filtre/...
        - Nom (name)
        - Ref (ref)
        - Disponibilité (libre ou non) (availability) (available/borrowed)
        - Catégorie (category)
    - Emprunter un matériel     POST /:id_materiel/borrow/:id_utilisateur
    Coté admin :
        - Ajouter des matériels     PUT /add (token + informations sur le matériel dans le corps de la requête)
        - Modifier les matériels     POST /modify (token + informations sur le matériel dans le corps de la requête)
        - Supprimer des matériels   DELETE /delete/:id_materiel (token dans le corps de la requête)
        - Historique des emprunts pour un matériel      GET /:id_materiel/history (token dans le corps de la requête)
        

Catégories : /category - Milan
    Coté admin :
        - Ajouter des catégories    PUT /add/:nom_categorie (token dans le corps de la requête)
        - Modifier les catégories   POST /modify (token + informations sur le catégorie dans le corps de la requête)
        - Supprimer des catégories  DELETE /delete/:id_category (token dans le corps de la requête)

Authentification : /auth - Yohan
    - Faire s'authentifier un utilisateur (renvoie un token de connexion)   POST /auth/login (informations d'authentification de l'utilisateur)
*/

const router = express.Router();


router.use('/devices', device_route);
router.use('/users', user_route);
router.use('/category', category_route);
router.use('/auth', auth_route);

export default router;