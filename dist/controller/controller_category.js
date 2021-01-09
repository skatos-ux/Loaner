"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_category_1 = __importDefault(require("../dao/dao_category"));
const controller_1 = __importDefault(require("./controller"));
const category_1 = __importDefault(require("../model/category"));
const controller_auth_1 = __importDefault(require("./controller_auth"));
class CategoryController extends controller_1.default {
    constructor() {
        super(...arguments);
        this.dao = new dao_category_1.default();
        this.auth = new controller_auth_1.default();
    }
    addCategory(req, res, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    if (!(yield this.dao.hasCategoryWithName(name))) {
                        const lastId = (yield this.dao.getLastId()) + 1;
                        const category = new category_1.default(lastId, name);
                        this.dao.addCategory(category).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        throw new Error("Category name already exists");
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    modifyCategory(req, res, oldName, newName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.auth.checkToken(req, res, true)) {
                try {
                    if (oldName === newName) {
                        throw new Error("Old name can't be the equal to new name");
                    }
                    if (!(yield this.dao.hasCategoryWithName(newName))) {
                        const category = yield this.dao.getByName(oldName);
                        this.dao.modifyCategory(category.getID(), newName).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        throw new Error("New name is already set for a category");
                    }
                }
                catch (err) {
                    this.giveError(err, res);
                }
            }
        });
    }
    deleteCategory(req, res, idCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    const idCat = Number.parseInt(idCategory);
                    if (Number.isNaN(idCat)) {
                        throw new Error("Category ID is not a number");
                    }
                    if (yield this.dao.hasCategoryWithID(idCat)) {
                        this.dao.deleteCategory(idCat).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        this.giveError(new Error("Invalid category ID"), res);
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
}
exports.default = CategoryController;
