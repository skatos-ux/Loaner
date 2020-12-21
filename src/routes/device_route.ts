import { Router } from 'express';

import DeviceController from '../controller/controller_device';

const router = Router();
const controller = new DeviceController();

// On dit que lorsque l'on reçout une requête HTTP GET sur /all, on exécute la méthode getAll de DeviceController
// req = Request = Informations sur le requête reçue
// res = Response = Informations sur la réponse que l'on va fourni au client
router.get('/all', (req, res) => {
    controller.getAll(res);
});

router.get('/:id_utilisateur/history', (req, res) => {
    const idUser = req.params.id_utilisateur || null;
    res.send(idUser);
});

export default router;