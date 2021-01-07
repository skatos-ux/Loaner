import { Router } from 'express';

import DeviceController from '../controller/controller_device';
import AuthController from '../controller/controller_auth';
import CategoryController from '../controller/controller_category';
import { start } from 'repl';

const router = Router();
const controller = new DeviceController();
const controllerAuth = new AuthController();

// On dit que lorsque l'on reçoit une requête HTTP GET sur /all, on exécute la méthode getAll de DeviceController
// req = Request = Informations sur le requête reçue
// res = Response = Informations sur la réponse que l'on va fourni au client
router.get('/all', (req, res) => {

    // On vérifie si la requête possède des arguments dans son URL
    if(Object.keys(req.query).length > 0) {
        controller.filterDevice(req, res, req.query);
    } else {
        controller.getAll(req, res);
    }
});

router.get('/:device_ref', (req,res) => {
    const refDevice = req.params.device_ref;
    controller.getInfoDevice(req, res, refDevice);
});

router.post('/:device_ref/borrow/:id_user', (req,res) => {
    const idUser = req.params.id_user;
    if(controllerAuth.checkToken(req, res, false, idUser)) {
        const refDevice = req.params.device_ref;
        const startDate = req.body.loanDays[0];
        const endDate = req.body.loanDays[1];
        controller.borrowDevice(req, res, refDevice, idUser, startDate, endDate);
   }
});

router.put('/add', (req,res) =>{
    if(controllerAuth.checkToken(req,res,true)) {
        const ref = req.body.ref;
        const category = req.body.category;
        const name = req.body.name;
        const version = req.body.version;
        const photo = req.body.photo;
        const phone = req.body.phone;
        controller.addDevice(req, res, ref, category, name, version, photo, phone);
    }
});

router.post('/delete/:device_ref', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)) {
        const deviceRef = req.params.device_ref;
        controller.deleteDevice(req, res, deviceRef);
    }
});

router.get('/:device_ref/history', (req, res) => {
    if(controllerAuth.checkToken(req,res,true)) {
        const deviceRef = req.params.device_ref;
        controller.historyDevice(req, res, deviceRef);
    }
});

export default router;