import { Router } from 'express';

import AuthController from '../controller/controller_auth';

const router = Router();
const controller = new AuthController();

router.post('/login', (req, res) => {
    const info = req.body;
    controller.authentificate(info.email, info.password, req, res);
});

router.post('/password/change', (req, res) => {
    const info = req.body;
    controller.changePassword(info.email, info.oldPassword, info.newPassword, req, res);
});

export default router;