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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = __importDefault(require("./dao"));
const user_1 = __importDefault(require("../model/user"));
const config = __importStar(require("../config.json"));
const bcrypt = __importStar(require("bcryptjs"));
class DAOUser extends dao_1.default {
    rowToModel(row) {
        return new user_1.default(row.id, row.firstName, row.lastName, row.mail, row.admin === 1, row.temporaryPassword === 1);
    }
    getAll() {
        return this.getAllRows("SELECT * FROM user");
    }
    getUser(idUser) {
        return this.getOneRow("SELECT * FROM user WHERE id = ?", [idUser]);
    }
    getLastId() {
        return this.getOneRow('SELECT * FROM user ORDER BY id DESC LIMIT 1');
    }
    addUser(user, password) {
        return this.runQuery("INSERT INTO user VALUES(?,?,?,?,?,?,?)", [user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(),
            user.isAdmin(), bcrypt.hashSync(password, config.hashSaltRounds), true]);
    }
    updateUser(user) {
        return this.runQuery("UPDATE user SET firstname = ?, lastname = ?, mail = ?, admin = ? WHERE id = ?", [user.getFirstName(), user.getLastName(), user.getEmail(), user.isAdmin(), user.getId()]);
    }
    deleteUser(idUser) {
        return this.runQuery("DELETE FROM user WHERE id = ?", [idUser]);
    }
    hasUserWithId(idUser) {
        return this.hasRow("SELECT * FROM user WHERE id = ?", [idUser]);
    }
    hasUserWithEmail(email) {
        return this.hasRow("SELECT * FROM user WHERE mail = ?", [email]);
    }
    hasUserWithEmailExcept(email, exceptUserId) {
        return this.hasRow("SELECT * FROM user WHERE mail = ? AND id != ?", [email, exceptUserId]);
    }
    checkUser(email, password) {
        return this.getOneRowNoCast("SELECT * FROM user WHERE mail = ?", [email])
            .then((row) => {
            if (bcrypt.compareSync(password, row.password)) {
                return this.rowToModel(row);
            }
            throw new Error("Invalid password");
        });
    }
    changePassword(email, newPassword) {
        return this.runQuery("UPDATE user SET password = ?, temporaryPassword = 0 WHERE mail = ?", [bcrypt.hashSync(newPassword, config.hashSaltRounds), email]);
    }
}
exports.default = DAOUser;
