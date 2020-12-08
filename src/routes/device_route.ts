import { Router } from 'express';

import DeviceController from '../controller/controller_device';

const router = Router();
const controller = new DeviceController();

router.get('/all', (req, res) => {
    controller.getAll(res);
});

export default router;