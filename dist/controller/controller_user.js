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
const controller_1 = __importDefault(require("./controller"));
const dao_user_1 = __importDefault(require("../dao/dao_user"));
const dao_reservation_1 = __importDefault(require("../dao/dao_reservation"));
const user_1 = __importDefault(require("../model/user"));
const controller_auth_1 = __importDefault(require("./controller_auth"));
const generate_password_1 = require("generate-password");
class UserController extends controller_1.default {
    constructor() {
        super(...arguments);
        this.dao = new dao_user_1.default();
        this.daoReservation = new dao_reservation_1.default();
        this.auth = new controller_auth_1.default();
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    this.dao.getAll().then(this.findSuccess(res)).catch(this.findError(res));
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    getUser(req, res, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    this.dao.getUser(userId).then(this.findSuccess(res)).catch(this.findError(res));
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    addUser(req, res, id, firstName, lastName, email, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.auth.checkToken(req, res, true)) {
                try {
                    if (!(yield this.dao.hasUserWithId(id))) {
                        const user = new user_1.default(id, firstName, lastName, email, admin);
                        if (yield this.dao.hasUserWithEmail(user.getEmail())) {
                            this.giveError(new Error("User with this email already exists"), res);
                            return;
                        }
                        const password = generate_password_1.generate({ length: 10, numbers: true });
                        this.dao.addUser(user, password).then(() => {
                            this.giveSuccess({
                                user: user,
                                password: password
                            }, res);
                        }).catch(this.findError(res));
                    }
                    else {
                        this.giveError(new Error("User with this ID already exists"), res);
                    }
                }
                catch (err) {
                    this.giveError(err, res);
                }
            }
        });
    }
    updateUser(req, res, id, firstName, lastName, email, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.auth.checkToken(req, res, true)) {
                try {
                    if (yield this.dao.hasUserWithId(id)) {
                        const user = new user_1.default(id, firstName, lastName, email, admin);
                        if (yield this.dao.hasUserWithEmailExcept(user.getEmail(), user.getId())) {
                            this.giveError(new Error("User with this email already exists"), res);
                            return;
                        }
                        this.dao.updateUser(user).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        this.giveError(new Error("User with this ID doesn't exists"), res);
                    }
                }
                catch (err) {
                    this.giveError(err, res);
                }
            }
        });
    }
    deleteUser(req, res, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    if (yield this.dao.hasUserWithId(userId)) {
                        this.dao.deleteUser(userId).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        this.giveError(new Error("User with this ID doesn't exists"), res);
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    getUserHistory(req, res, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    if (yield this.dao.hasUserWithId(userId)) {
                        this.daoReservation.getUserHistory(userId).then(this.findSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        this.giveError(new Error("User with this ID doesn't exists"), res);
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
}
exports.default = UserController;
