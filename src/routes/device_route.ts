import { Router } from 'express';

import DeviceController from '../controller/controller_device';

const router = Router();
const controller = new DeviceController();

router.get('/all', (req, res) => {

    // On vérifie si la requête possède des arguments dans son URL
    if (Object.keys(req.query).length > 0) {
        controller.filterDevice(req, res, req.query);
    } else {
        controller.getAll(req, res);
    }
});

router.get('/:device_ref', (req, res) => {
    const refDevice = req.params.device_ref;
    controller.getInfoDevice(req, res, refDevice);
});

router.post('/:device_ref/borrow/:id_user', (req, res) => {

    try {
        const userId = req.params.id_user;
        const refDevice = req.params.device_ref;
        const loanDays = req.body.loanDays;

        if (!loanDays) {
            throw new Error("No loanDays given");
        }

        if(typeof loanDays != "object" || loanDays.length == undefined) {
            throw new Error("Invalid loanDays");
        }

        if(loanDays.length != 2) {
            throw new Error("Invalid loanDays count");
        }

        const startDate = loanDays[0];
        const endDate = loanDays[1];

        controller.borrowDevice(req, res, refDevice, userId, startDate, endDate);

    } catch (err) {
        controller.giveError(err, res);
    }
});

router.put('/add', (req, res) => {

    try {

        if (!req.body.ref) {
            throw new Error("Missing reference");
        }

        if (!req.body.category) {
            throw new Error("Missing category name");
        }

        const ref = req.body.ref;
        const category = req.body.category;
        const name = req.body.name;
        const version = req.body.version;
        const photo = req.body.photo;
        const phone = req.body.phone;

        controller.addDevice(req, res, ref, category, name, version, photo, phone);

    } catch (err) {
        controller.giveError(err, res);
    }
});

router.delete('/delete/:device_ref', (req, res) => {
    const deviceRef = req.params.device_ref;
    controller.deleteDevice(req, res, deviceRef);
});


// Pas utilisé donc pas testé
router.get('/:device_ref/history', (req, res) => {
    const deviceRef = req.params.device_ref;
    controller.historyDevice(req, res, deviceRef);
});

export default router;