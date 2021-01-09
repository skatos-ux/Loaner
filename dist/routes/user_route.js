"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_user_1 = __importDefault(require("../controller/controller_user"));
const router = express_1.Router();
const controller = new controller_user_1.default();
router.get("/all", (req, res) => {
    controller.getAll(req, res);
});
router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    controller.getUser(req, res, userId);
});
router.put("/add", (req, res) => {
    const info = req.body;
    controller.addUser(req, res, info.id, info.firstName, info.lastName, info.email, info.admin);
});
router.post("/modify", (req, res) => {
    const info = req.body;
    controller.updateUser(req, res, info.id, info.firstName, info.lastName, info.email, info.admin);
});
router.delete("/delete/:userId", (req, res) => {
    const userId = req.params.userId;
    controller.deleteUser(req, res, userId);
});
router.get("/:userId/history", (req, res) => {
    const userId = req.params.userId;
    controller.getUserHistory(req, res, userId);
});
exports.default = router;
