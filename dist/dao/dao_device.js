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
const dao_1 = __importDefault(require("./dao"));
const device_1 = __importDefault(require("../model/device"));
const dao_reservation_1 = __importDefault(require("./dao_reservation"));
const reservation_1 = __importDefault(require("../model/reservation"));
class DAODevice extends dao_1.default {
    constructor() {
        super(...arguments);
        this.daoReservation = new dao_reservation_1.default();
    }
    rowToModel(row) {
        const device = new device_1.default(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
        return device;
    }
    rowToModelAsync(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = new device_1.default(row.ref, row.categoryID, row.categoryName, row.name, row.version, row.photo, row.phone);
            yield this.daoReservation.getAllReservationsDevice(row.ref).then(reservations => {
                reservations.forEach(reservation => device.addLockDays(reservation.getLockDays()));
            });
            return device;
        });
    }
    getAll() {
        return this.getAllRowsNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id").then((rows) => __awaiter(this, void 0, void 0, function* () {
            const promises = rows.map(this.rowToModelAsync.bind(this));
            return Promise.all(promises);
        }));
    }
    get(refDevice) {
        return this.getOneRowNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND d.ref=?", refDevice).then(row => { return this.rowToModelAsync.bind(this)(row); });
    }
    borrowDevice(reservations) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = reservations.map(reservation => {
                return this.runQuery('INSERT INTO reservation VALUES(?,?,?,?,?,?)', [reservation.getID(), reservation.getDevice(), reservation.getUserID(),
                    reservation_1.default.convertDate(reservation.getStartDate()), reservation_1.default.convertDate(reservation.getEndDate()),
                    (reservation.hasReturnDate()) ? reservation_1.default.convertDate(reservation.getReturnDate()) : null]);
            });
            return Promise.all(promises);
        });
    }
    addDevice(device) {
        return this.runQuery('INSERT INTO device VALUES(?,?,?,?,?,?)', [device.getRef(), device.getCategoryID(), device.getName(), device.getVersion(), device.getPhoto(), device.getPhone()]);
    }
    deleteDevice(refDevice) {
        return this.runQuery('DELETE FROM device WHERE ref = ?', [refDevice]);
    }
    getDevicesByFilter(name, ref, categoryID) {
        if (name == "" && ref == "" && categoryID == -1) {
            return Promise.reject(new Error("All fields can't be empty"));
        }
        const sqlWhens = [];
        const params = [];
        if (name != "") {
            sqlWhens.push("d.name = ?");
            params.push(name);
        }
        if (ref != "") {
            sqlWhens.push("d.ref = ?");
            params.push(ref);
        }
        if (categoryID != -1) {
            sqlWhens.push("d.idCategory = ?");
            params.push(categoryID);
        }
        return this.getAllRowsNoCast("SELECT ref, d.name as name, version, photo, phone, c.id as categoryID, c.name as categoryName " +
            "FROM device d, category c " +
            "WHERE d.idCategory = c.id AND " + sqlWhens.join(" AND "), params).then((rows) => __awaiter(this, void 0, void 0, function* () {
            const promises = rows.map(this.rowToModelAsync.bind(this));
            return Promise.all(promises);
        }));
    }
    hasDeviceWithRef(ref) {
        return this.hasRow("SELECT * FROM device WHERE ref = ?", [ref]);
    }
}
exports.default = DAODevice;
