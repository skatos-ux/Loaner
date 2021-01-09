"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Reservation {
    constructor(ID, refDevice, idUser, startDate, endDate, returnDate = "") {
        if (!ID || ID < 0) {
            throw new Error("Invalid ID");
        }
        if (!refDevice || refDevice.length != 5) {
            throw new Error("Invalid device reference");
        }
        if (!idUser || idUser.length != 7) {
            throw new Error("Invalid user id");
        }
        if (!startDate || startDate.length != 10 || !this.checkDate(startDate)) {
            throw new Error("Invalid start date");
        }
        if (!endDate || endDate.length != 10 || !this.checkDate(endDate)) {
            throw new Error("Invalid end date");
        }
        if (returnDate && ((returnDate.length != 0 && returnDate.length != 10) || !this.checkDate(returnDate))) {
            throw new Error("Invalid return date");
        }
        this.ID = ID;
        this.refDevice = refDevice;
        this.idUser = idUser;
        this.startDate = startDate;
        this.endDate = endDate;
        this.returnDate = returnDate;
        if (this.getStartDate() > this.getEndDate()) {
            throw new Error("Start date is after end date");
        }
    }
    checkDate(dateString) {
        return !isNaN(Date.parse(dateString));
    }
    getID() {
        return this.ID;
    }
    getDevice() {
        return this.refDevice;
    }
    getUserID() {
        return this.idUser;
    }
    getStartDate() {
        return new Date(this.startDate);
    }
    getEndDate() {
        return new Date(this.endDate);
    }
    hasReturnDate() {
        return !!this.returnDate && this.returnDate.length != 0;
    }
    getReturnDate() {
        if (!this.hasReturnDate()) {
            throw new Error("Return date is undefined");
        }
        return new Date(this.returnDate);
    }
    getLockDays() {
        const startDate = this.getStartDate();
        let endDate;
        if (this.hasReturnDate()) {
            endDate = this.getReturnDate();
        }
        else {
            endDate = this.getEndDate();
        }
        return [startDate, endDate].map(Reservation.convertDate);
    }
    static convertDate(date) {
        let month = "" + (date.getMonth() + 1);
        let day = "" + date.getDate();
        const year = date.getFullYear();
        if (month.length < 2)
            month = "0" + month;
        if (day.length < 2)
            day = "0" + day;
        return [year, month, day].join('-');
    }
}
exports.default = Reservation;
