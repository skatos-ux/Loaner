import { Router } from 'express';

import DeviceController from '../controller/controller_device';
import AuthController from '../controller/controller_auth';
import Device from '../model/device';

const router = Router();
const controller = new DeviceController();
const controllerAuth = new AuthController();

// On dit que lorsque l'on reçoit une requête HTTP GET sur /all, on exécute la méthode getAll de DeviceController
// req = Request = Informations sur le requête reçue
// res = Response = Informations sur la réponse que l'on va fourni au client
router.get('/all', (req, res) => {

    if(Object.keys(req.query).length > 0) {
        controller.filterDevice(res, req.query);
    } else {
        controller.getAll(res);
    }
});

router.get('/:id_device', (req,res) => {
    const idDevice = req.params.id_device;
    controller.getInfoDevice(res, idDevice);
});

router.post('/:id_device/borrow/:id_user', (req,res) => {
    const idUser = req.params.id_user;
    if(controllerAuth.checkToken(req,res,false,Number.parseInt(idUser))) {
        const idDevice = req.params.id_device;
        
        controller.borrowDevice(res, idDevice, idUser);
    }
});

router.put('/add', (req,res) =>{
    if(controllerAuth.checkToken(req,res,true)){
        const device: Device = JSON.parse(req.body);
        controller.addDevice(res, device);
    }
});

router.post('/delete/:id_device', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)){
        const idDevice = req.params.id_device;
        controller.deleteDevice(res, idDevice);
    }
});

router.get('/:id_device/history', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)){
        const idDevice = req.params.id_device;
        controller.historyDevice(res, idDevice);
    }
});

export default router;