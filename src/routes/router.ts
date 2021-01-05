import express from 'express';
import device_route from './device_route';
import user_route from './user_route';
import category_route from './category_route';
import auth_route from './auth_route';

/*
Racine : /api

Utilisateurs : /users - Lilian
 Coté admin :
 X   - Liste de tous les utilisateurs    GET /all
 X   - Obtenir les informations d'un utilisateur (pas sur)     GET /:id_utilisateur
 X   - Ajouter un utilisateur            PUT /add (informations de l'utilisateur dans le corps de la requête)
 X   - Modifier un utilisateur           POST /modify (informations de l'utilisateur dans le corps de la requête)
 X   - Supprimer un utilisateur          DELETE /delete/:id_utilisateur
 X   - Historique des emprunts pour un utilisateur   GET /:id_utilisateur/history

Matériels : /devices - Milan / Yohan
    -> reservation : renvoyer sous le format : lockDays = [ ['start1', 'end1'], ['start2', 'end2'] ]
    -> end = (returnDate == null) ? endDate : returnDate
    X  - Liste de tous les matériels   GET /all
    X  - Obtenir les informations d'un matériel (pas sur)     GET /:id_materiel
    X - Filtrer une recherche de matériel selon un filtre (à voir si cummulable)  GET /all?nom_filtre=valeur_filtre&...
        - Nom (name)
        - Ref (ref)
        - Catégorie (category)
    X - Emprunter un matériel     POST /:id_materiel/borrow/:id_utilisateur
    Coté admin :
    X    - Ajouter des matériels     PUT /add (token + informations sur le matériel dans le corps de la requête)
        - Modifier les matériels     POST /modify (token + informations sur le matériel dans le corps de la requête)
    X    - Supprimer des matériels   DELETE /delete/:id_materiel (token dans le corps de la requête)
    X    - Historique des emprunts pour un matériel      GET /:id_materiel/history (token dans le corps de la requête)

Catégories : /category - Milan
    Coté admin :
    X    - Ajouter des catégories    PUT /add/:nom_categorie (token dans le corps de la requête)
    X    - Modifier les catégories   POST /modify (token + informations sur le catégorie dans le corps de la requête)
    X    - Supprimer des catégories  DELETE /delete/:id_category (token dans le corps de la requête)

Authentification : /auth - Yohan
    X - Faire s'authentifier un utilisateur (renvoie un token de connexion)   POST /auth/login (informations d'authentification de l'utilisateur)
    X - Changement de mot de passe d'un utilisateur (pour le temporaryPassword) POST /auth/password/change (identique à /auth/login avec l'ancien mdp en plus)
*/

const router = express.Router();


router.use('/devices', device_route);
router.use('/users', user_route);
router.use('/category', category_route);
router.use('/auth', auth_route);

export default router;