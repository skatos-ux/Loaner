"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_category_1 = __importDefault(require("../controller/controller_category"));
const router = express_1.Router();
const controller = new controller_category_1.default();
router.put('/add/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    controller.addCategory(req, res, categoryName);
});
router.post('/modify', (req, res) => {
    const names = req.body;
    controller.modifyCategory(req, res, names.oldName, names.newName);
});
router.delete('/delete/:id_category', (req, res) => {
    const idCategory = req.params.id_category;
    controller.deleteCategory(req, res, idCategory);
});
exports.default = router;
