import { Router } from 'express';

import AuthController from '../controller/controller_auth';

const router = Router();
const controller = new AuthController();

router.post('/login', (req, res) => {
    const info = req.body;
    controller.authentificate(info.firstName, info.lastName, info.password, req, res);
});

export default router;