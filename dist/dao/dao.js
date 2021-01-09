"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const config = __importStar(require("../config.json"));
const sqlite = sqlite3_1.verbose();
const db = new sqlite.Database(config.dbFile);
class DAO {
    getOneRow(sqlQuery, params = []) {
        return this.getOneRowNoCast(sqlQuery, params).then((row) => { return this.rowToModel.bind(this)(row); });
    }
    getOneRowNoCast(sqlQuery, params = []) {
        return new Promise((resolve, reject) => {
            db.get(sqlQuery, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                else if (row == null) {
                    reject(new Error("Cannot find results"));
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    getAllRows(sqlQuery, params = []) {
        return this.getAllRowsNoCast(sqlQuery, params).then((rows) => { return rows.map(this.rowToModel.bind(this)); });
    }
    getAllRowsNoCast(sqlQuery, params = []) {
        return new Promise((resolve, reject) => {
            db.all(sqlQuery, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    hasRow(sqlQuery, params) {
        return new Promise((resolve, reject) => {
            db.get(sqlQuery, params, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row != null);
                }
            });
        });
    }
    runQuery(sqlQuery, params) {
        return new Promise((resolve, reject) => {
            db.run(sqlQuery, params, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = DAO;
