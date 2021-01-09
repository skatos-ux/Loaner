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
const config = __importStar(require("../config.json"));
const jwt = __importStar(require("jsonwebtoken"));
class AuthController extends controller_1.default {
    constructor() {
        super(...arguments);
        this.dao = new dao_user_1.default();
    }
    authentificate(email, password, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.hasToken(req)) {
                    throw new Error("You already have a token");
                }
                this.dao.checkUser(email, password)
                    .then((user) => {
                    const token = jwt.sign({ id: user.getId(), admin: user.isAdmin() }, config.jwtSecret, {
                        expiresIn: "1h"
                    });
                    this.giveSuccess({
                        auth: true,
                        token: token,
                        user: user
                    }, res);
                })
                    .catch(() => {
                    this.giveError(new Error("Invalid name or password"), res);
                });
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    changePassword(email, oldPassword, newPassword, req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (newPassword.length == 0) {
                    this.giveError(new Error("New password can't be empty"), res);
                    return;
                }
                this.dao.checkUser(email, oldPassword)
                    .then((user) => {
                    if (this.checkToken(req, res, user.isAdmin(), user.getId())) {
                        this.dao.changePassword(email, newPassword).then(() => {
                            this.giveSuccess({
                                success: true,
                                user: user
                            }, res, 201);
                        })
                            .catch(this.findError(res));
                    }
                })
                    .catch(() => {
                    this.giveError(new Error("Invalid name or old password"), res);
                });
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    hasToken(req) {
        return !!req.headers['x-access-token'];
    }
    checkToken(req, res, requireAdmin = false, requiredUserID = "") {
        var _a;
        if (!this.hasToken(req)) {
            this.giveError(new Error("No token specified"), res, 401);
            return false;
        }
        const token = ((_a = req.headers['x-access-token']) === null || _a === void 0 ? void 0 : _a.toString()) || "";
        try {
            const userInfo = jwt.verify(token, config.jwtSecret);
            const userID = userInfo["id"] || "";
            const admin = userInfo["admin"] || false;
            if (requireAdmin && !admin) {
                this.giveError(new Error("This endpoint requires admin privileges"), res, 401);
                return false;
            }
            if (requiredUserID != "" && userID != requiredUserID) {
                this.giveError(new Error("Invalid user"), res, 401);
                return false;
            }
        }
        catch (_b) {
            this.giveError(new Error("Invalid token"), res, 401);
            return false;
        }
        return true;
    }
}
exports.default = AuthController;
