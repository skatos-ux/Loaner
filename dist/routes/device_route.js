"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_device_1 = __importDefault(require("../controller/controller_device"));
const router = express_1.Router();
const controller = new controller_device_1.default();
router.get('/all', (req, res) => {
    if (Object.keys(req.query).length > 0) {
        controller.filterDevice(req, res, req.query);
    }
    else {
        controller.getAll(req, res);
    }
});
router.get('/:device_ref', (req, res) => {
    const refDevice = req.params.device_ref;
    controller.getInfoDevice(req, res, refDevice);
});
router.post('/borrow/:id_user', (req, res) => {
    try {
        const userId = req.params.id_user;
        const commands = req.body.commands;
        if (!commands) {
            throw new Error("No commands given");
        }
        controller.borrowDevice(req, res, commands, userId);
    }
    catch (err) {
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
    }
    catch (err) {
        controller.giveError(err, res);
    }
});
router.delete('/delete/:device_ref', (req, res) => {
    const deviceRef = req.params.device_ref;
    controller.deleteDevice(req, res, deviceRef);
});
router.get('/:device_ref/history', (req, res) => {
    const deviceRef = req.params.device_ref;
    controller.historyDevice(req, res, deviceRef);
});
exports.default = router;
