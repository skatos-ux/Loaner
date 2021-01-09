"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Device {
    constructor(ref, categoryID, categoryName, name, version, photo, phone) {
        this.setRef(ref);
        this.categoryID = categoryID;
        this.categoryName = categoryName;
        this.setName(name);
        this.setVersion(version);
        this.setPhoto(photo);
        this.setPhone(phone);
        this.lockDays = [];
    }
    getRef() {
        return this.ref;
    }
    getCategoryID() {
        return this.categoryID;
    }
    getCategoryName() {
        return this.categoryName;
    }
    getName() {
        return this.name;
    }
    getVersion() {
        return this.version;
    }
    getPhoto() {
        return this.photo;
    }
    getPhone() {
        return this.phone;
    }
    getLockDays() {
        return this.lockDays;
    }
    setRef(ref) {
        if (!ref || ref.length != 5) {
            throw new Error("Invalid reference");
        }
        this.ref = ref;
    }
    setName(name) {
        if (!name || name.length == 0 || name.length > 30) {
            throw new Error("Invalid name");
        }
        this.name = name;
    }
    setVersion(version) {
        if (!version || version.length < 3 || version.length > 15) {
            throw new Error("Invalid version");
        }
        this.version = version;
    }
    setPhoto(photo) {
        this.photo = photo;
    }
    setPhone(phone) {
        if ((!phone || phone.length > 14) && phone.length != 0) {
            throw new Error("Invalid phone number");
        }
        this.phone = phone;
    }
    addLockDays(lockDays) {
        this.lockDays.push(lockDays);
    }
}
exports.default = Device;
