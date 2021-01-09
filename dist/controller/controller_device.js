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
const dao_device_1 = __importDefault(require("../dao/dao_device"));
const dao_reservation_1 = __importDefault(require("../dao/dao_reservation"));
const device_1 = __importDefault(require("../model/device"));
const dao_category_1 = __importDefault(require("../dao/dao_category"));
const controller_auth_1 = __importDefault(require("./controller_auth"));
const reservation_1 = __importDefault(require("../model/reservation"));
class DeviceController extends controller_1.default {
    constructor() {
        super(...arguments);
        this.dao = new dao_device_1.default();
        this.daoReservation = new dao_reservation_1.default();
        this.daoCategory = new dao_category_1.default();
        this.auth = new controller_auth_1.default();
    }
    mapToCategories(devices) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.daoCategory.getAll();
            devices.forEach((device) => {
                const cat = categories.find((value) => {
                    return value.getID() == device.getCategoryID();
                });
                cat === null || cat === void 0 ? void 0 : cat.addDevice(device);
            });
            return categories;
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res)) {
                    this.dao.getAll().then(devices => {
                        this.mapToCategories(devices).then(this.findSuccess(res)).catch(this.findError(res));
                    }).catch(this.findError(res));
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    getInfoDevice(req, res, refDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res)) {
                    if (yield this.dao.hasDeviceWithRef(refDevice)) {
                        this.dao.get(refDevice).then(this.findSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        throw new Error("Invalid device reference");
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    borrowDevice(req, res, commands, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, false, userId)) {
                    let lastId = (yield this.daoReservation.getLastId()) + 1;
                    const reservations = yield Promise.all(commands.map((device) => __awaiter(this, void 0, void 0, function* () {
                        if (!device.reference) {
                            throw new Error("No reference given");
                        }
                        const ref = device.reference;
                        if (!device.loanDays) {
                            throw new Error("No loanDays given");
                        }
                        if (typeof device.loanDays != "object" || device.loanDays.length == undefined) {
                            throw new Error("Invalid loanDays");
                        }
                        if (device.loanDays.length != 2) {
                            throw new Error("Invalid loanDays count");
                        }
                        const startDate = device.loanDays[0];
                        const endDate = device.loanDays[1];
                        const reservation = new reservation_1.default(lastId++, ref, userId, startDate, endDate);
                        if (yield this.daoReservation.hasReservationWithInfos(ref, new Date(startDate), new Date(endDate))) {
                            throw new Error("Reservation already exists");
                        }
                        return reservation;
                    })));
                    this.dao.borrowDevice(reservations).then(this.editSuccess(res)).catch(this.findError(res));
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    addDevice(req, res, ref, categoryName, name, version, photo, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    if (!(yield this.dao.hasDeviceWithRef(ref))) {
                        const cat = yield this.daoCategory.getByName(categoryName);
                        const device = new device_1.default(ref, cat.getID(), cat.getName(), name, version, photo, phone);
                        this.dao.addDevice(device).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        throw new Error("Device reference is already used");
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    deleteDevice(req, res, deviceRef) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res, true)) {
                    if (yield this.dao.hasDeviceWithRef(deviceRef)) {
                        this.dao.deleteDevice(deviceRef).then(this.editSuccess(res)).catch(this.findError(res));
                    }
                    else {
                        throw new Error("Invalid device reference");
                    }
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    historyDevice(req, res, idDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            this.daoReservation.historyDevice(idDevice).then(this.findSuccess(res)).catch(this.findError(res));
        });
    }
    filterDevice(req, res, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.auth.checkToken(req, res)) {
                    let name = "";
                    let ref = "";
                    let categoryID = -1;
                    for (const param in params) {
                        const value = params[param];
                        if (param == "name") {
                            if (typeof value == "string") {
                                name = value;
                            }
                            else {
                                throw new Error("'name' is not a string");
                            }
                        }
                        else if (param == "ref") {
                            if (typeof value == "string") {
                                ref = value;
                            }
                            else {
                                throw new Error("'ref' is not a string");
                            }
                        }
                        else if (param == "category") {
                            if (typeof value == "string") {
                                const daoCat = new dao_category_1.default();
                                const d = yield daoCat.getByName(value);
                                categoryID = d.getID();
                            }
                            else {
                                throw new Error("'availability' is not a string");
                            }
                        }
                        else {
                            throw new Error("Invalid parameter '" + param + "'");
                        }
                    }
                    this.dao.getDevicesByFilter(name, ref, categoryID).then(devices => {
                        this.mapToCategories(devices).then(this.findSuccess(res)).catch(this.findError(res));
                    }).catch(this.findError(res));
                }
            }
            catch (err) {
                this.giveError(err, res);
            }
        });
    }
    getCategoryByName(res, name) {
        return __awaiter(this, void 0, void 0, function* () {
            this.daoCategory.getByName(name).then(this.findSuccess(res)).catch(this.findError(res));
        });
    }
}
exports.default = DeviceController;
