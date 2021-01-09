"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = __importDefault(require("./dao"));
const category_1 = __importDefault(require("../model/category"));
class DAOCategory extends dao_1.default {
    rowToModel(row) {
        return new category_1.default(row.id, row.name);
    }
    addCategory(category) {
        return this.runQuery("INSERT INTO category VALUES(?, ?)", [category.getID(), category.getName()]);
    }
    getAll() {
        return this.getAllRows("SELECT * FROM category");
    }
    deleteCategory(idCategory) {
        if (idCategory < 0) {
            return Promise.reject(new Error("Invalid category ID"));
        }
        this.runQuery("DELETE FROM device WHERE idCategory = ?", [idCategory]);
        return this.runQuery("DELETE FROM category WHERE id = ?", [idCategory]);
    }
    modifyCategory(id, newName) {
        return this.runQuery('update category set name = ? where id = ?', [newName, id]);
    }
    getLastId() {
        return this.getOneRowNoCast('SELECT id FROM category ORDER BY id DESC LIMIT 1').then(row => { return row.id; }).catch(() => { return 1; });
    }
    hasCategoryWithID(id) {
        return this.hasRow("SELECT * FROM category WHERE id = ?", [id]);
    }
    hasCategoryWithName(name) {
        return this.hasRow("SELECT * FROM category WHERE name = ?", [name]);
    }
    getByName(name) {
        return this.getOneRow("SELECT * FROM category WHERE name = ?", name).catch(() => { throw new Error("Invalid category name"); });
    }
}
exports.default = DAOCategory;
