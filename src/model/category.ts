import Device from "./device";

export default class Category {
    private ID!: number;
    private name!: string;
    private devices!: Device[];

    constructor(ID : number, name : string) {
        this.ID = ID;
        this.name = name;
        this.devices = [];
    }

    public getID() : number {
        return this.ID;
    }

    public getName() : string {
        return this.name;
    }

    public getDevices() : Device[] {
        return this.devices;
    }

    public setID(ID : number) : void {

        if(ID < 0) {
            throw new Error("Invalid ID");
        }

        this.ID = ID;
    }

    public setName(name : string) : void {

        if(!name || name.length == 0 || name.length > 255) {
            throw new Error("Invalid name");
        }

        this.name = name;
    }

    public addDevice(device : Device) : void {
        this.devices.push(device);
    }
}