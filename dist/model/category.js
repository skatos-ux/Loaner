"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor(ID, name) {
        this.setID(ID);
        this.setName(name);
        this.devices = [];
    }
    getID() {
        return this.ID;
    }
    getName() {
        return this.name;
    }
    getDevices() {
        return this.devices;
    }
    setID(ID) {
        if (ID < 0) {
            throw new Error("Invalid ID");
        }
        this.ID = ID;
    }
    setName(name) {
        if (name == null || name.length == 0 || name.length > 255) {
            throw new Error("Invalid name");
        }
        this.name = name;
    }
    addDevice(device) {
        this.devices.push(device);
    }
}
exports.default = Category;
