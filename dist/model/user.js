"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, firstName, lastName, email, admin, temporaryPassword = true) {
        this.setId(id);
        this.setFirstName(firstName);
        this.setLastName(lastName);
        this.setEmail(email);
        this.setAdmin(admin);
        this.setTemporaryPassword(temporaryPassword);
    }
    getId() {
        return this.id;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    isAdmin() {
        return this.admin;
    }
    hasTemporaryPassword() {
        return this.temporaryPassword;
    }
    setId(id) {
        if (id.length != 7) {
            throw new Error("Invalid ID");
        }
        this.id = id;
    }
    setFirstName(firstName) {
        if (!firstName || firstName.length == 0 || firstName.length > 30) {
            throw new Error("Invalid firstname");
        }
        this.firstName = firstName;
    }
    setLastName(lastName) {
        if (!lastName || lastName.length == 0 || lastName.length > 30) {
            throw new Error("Invalid lastname");
        }
        this.lastName = lastName;
    }
    setEmail(email) {
        var _a;
        if (!email || email.length == 0 || ((_a = email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+/g)) === null || _a === void 0 ? void 0 : _a.length) != 1) {
            throw new Error("Invalid email");
        }
        this.email = email;
    }
    setAdmin(admin) {
        this.admin = admin;
    }
    setTemporaryPassword(temporaryPassword) {
        this.temporaryPassword = temporaryPassword;
    }
}
exports.default = User;
