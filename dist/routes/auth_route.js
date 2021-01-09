"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_auth_1 = __importDefault(require("../controller/controller_auth"));
const router = express_1.Router();
const controller = new controller_auth_1.default();
router.post('/login', (req, res) => {
    const info = req.body;
    controller.authentificate(info.email, info.password, req, res);
});
router.post('/password/change', (req, res) => {
    const info = req.body;
    controller.changePassword(info.email, info.oldPassword, info.newPassword, req, res);
});
exports.default = router;
