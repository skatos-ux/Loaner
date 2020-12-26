import { Router } from 'express';
import { send } from 'process';

import DeviceController from '../controller/controller_device';
import Category from '../model/category';
import Device from '../model/device';

const router = Router();
const controller = new DeviceController();

// On dit que lorsque l'on reçoit une requête HTTP GET sur /all, on exécute la méthode getAll de DeviceController
// req = Request = Informations sur le requête reçue
// res = Response = Informations sur la réponse que l'on va fourni au client
router.get('/all', (req, res) => {
    controller.getAll(res);
});

router.get('/:id_device', (req,res) => {
    const idDevice = req.params.id_device;
    controller.getInfoDevice(res, idDevice);
});

router.post('/:id_device/borrow/:id_user', (req,res) => {
    const idDevice = req.params.id_device;
    const idUser = req.params.id_user;
    controller.borrowDevice(res, idDevice, idUser);
});

router.put('/add', (req,res) =>{
    const idDevice = "AN002";
    const nameCategory = "pc";
    const nameDevice = "netbook";
    const version = "1.0";
    const photo = "";
    const phone = "0234572281";
    const device = new Device(idDevice, new Category(1,nameCategory), nameDevice, version, photo, phone, false);
    controller.addDevice(res, device);
});

/*router.get('/:id_utilisateur/history', (req, res) => {
    const idUser = req.params.id_utilisateur || null;
    res.send(idUser);
});*/

export default router;