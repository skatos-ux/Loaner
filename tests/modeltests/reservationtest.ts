import Reservation from '../../src/model/reservation';

import { assert, expect } from 'chai';

const deviceRef = "AN001";
const userId = "ABCDEFG";
const startDate = "2021-04-07";
const endDate = "2021-08-07";
const returnDate = "2021-08-01";
const startDateISO = "2021-04-07T00:00:00.000Z";
const endDateISO = "2021-08-07T00:00:00.000Z";
const returnDateISO = "2021-08-01T00:00:00.000Z";

describe("Tests on reservation.ts", function() {

    it("Reservation creation", function() {
        const reservation = new Reservation(1, deviceRef, userId, startDate, endDate, returnDate);
        assert.equal(reservation.getID(), 1);
        assert.equal(reservation.getDevice(), deviceRef);
        assert.equal(reservation.getUserID(), userId);
        assert.equal(reservation.getStartDate().toISOString(), startDateISO);
        assert.equal(reservation.getEndDate().toISOString(), endDateISO);
        assert.isTrue(reservation.hasReturnDate());
        assert.equal(reservation.getReturnDate().toISOString(), returnDateISO);
    });

    it("Reservation creation without return date", function() {
        const reservation = new Reservation(1, deviceRef, userId, startDate, endDate);
        assert.equal(reservation.getID(), 1);
        assert.equal(reservation.getDevice(), deviceRef);
        assert.equal(reservation.getUserID(), userId);
        assert.equal(reservation.getStartDate().toISOString(), startDateISO);
        assert.equal(reservation.getEndDate().toISOString(), endDateISO);
        assert.isFalse(reservation.hasReturnDate());
        expect(reservation.getReturnDate).to.throw(Error);
    });

    it("Invalid ID throw an error", function() {
        expect(() => new Reservation(-1, deviceRef, userId, startDate, endDate)).to.throw("Invalid ID");
    });

    it("Invalid device reference throw an error", function() {
        expect(() => new Reservation(1, "PASVALIDE", userId, startDate, endDate)).to.throw("Invalid device reference");
    });

    it("Invalid user id throw an error", function() {
        expect(() => new Reservation(1, deviceRef, "INVAL", startDate, endDate)).to.throw("Invalid user id");
    });

    it("Invalid start date throw an error", function() {
        const errMsg = "Invalid start date";
        expect(() => new Reservation(1, deviceRef, userId, "jenefaispas10caracteresdelong", endDate)).to.throw(errMsg);
        expect(() => new Reservation(1, deviceRef, userId, "0123456789", endDate)).to.throw(errMsg);
        expect(() => new Reservation(1, deviceRef, userId, "0-20-0", endDate)).to.throw(errMsg);
    });

    it("Invalid end date throw an error", function() {
        const errMsg = "Invalid end date";
        expect(() => new Reservation(1, deviceRef, userId, startDate, "jenefaispas10caracteresdelong")).to.throw(errMsg);
        expect(() => new Reservation(1, deviceRef, userId, startDate, "0123456789")).to.throw(errMsg);
        expect(() => new Reservation(1, deviceRef, userId, startDate, "0-20-0")).to.throw(errMsg);
    });

    it("Invalid return date throw an error", function() {
        const errMsg = "Invalid return date";
        expect(() => new Reservation(1, deviceRef, userId, startDate, endDate, "jenefaispas10caracteresdelong")).to.throw(errMsg);
        expect(() => new Reservation(1, deviceRef, userId, startDate, endDate, "0123456789")).to.throw(errMsg);
        expect(() => new Reservation(1, deviceRef, userId, startDate, endDate, "0-20-0")).to.throw(errMsg);
    });

    it("Return date can be empty", function() {
        const reservation = new Reservation(1, deviceRef, userId, startDate, endDate, "");
        assert.isFalse(reservation.hasReturnDate());
    });

    it("Method convertDate works", function() {
        assert.equal(Reservation.convertDate(new Date(startDateISO)), startDate);
        assert.equal(Reservation.convertDate(new Date(endDateISO)), endDate);
        assert.equal(Reservation.convertDate(new Date(returnDateISO)), returnDate);
    });

    it("Generate correct lockDays", function() {
        const reservation1 = new Reservation(1, deviceRef, userId, startDate, endDate);
        expect(reservation1.getLockDays()).to.deep.equal([startDate, endDate]);

        const reservation2 = new Reservation(1, deviceRef, userId, startDate, returnDate);
        expect(reservation2.getLockDays()).to.deep.equal([startDate, returnDate]);
    });
});