"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = __importDefault(require("./dao"));
const reservation_1 = __importDefault(require("../model/reservation"));
class DAOReservation extends dao_1.default {
    rowToModel(row) {
        return new reservation_1.default(row.id, row.refDevice, row.idUser, row.startDate, row.endDate, row.returnDate);
    }
    getLastId() {
        return this.getOneRowNoCast('SELECT id FROM reservation ORDER BY id DESC LIMIT 1').then(row => { return row.id; }).catch(() => { return 1; });
    }
    historyDevice(idDevice) {
        return this.getAllRows('SELECT * FROM reservation WHERE refDevice = ?', [idDevice]);
    }
    getUserHistory(idUser) {
        return this.getAllRows("SELECT * FROM reservation WHERE idUser = ?", [idUser]);
    }
    getAllReservationsDevice(ref) {
        return this.getAllRows("SELECT * FROM reservation WHERE refDevice = ?", [ref]);
    }
    hasReservationWithInfos(refDevice, startDate, endDate) {
        return this.hasRow("SELECT * FROM reservation WHERE refDevice = ? AND startDate <= ? AND endDate >= ?", [refDevice, reservation_1.default.convertDate(endDate), reservation_1.default.convertDate(startDate)]);
    }
}
exports.default = DAOReservation;
