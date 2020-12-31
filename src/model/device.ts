export default class Device {
    private ref!: string;
    private category!: string;
    private name!: string;
    private version!: string;
    private photo!: string;
    private phone!: string;
    private lockDays!: string[];

    constructor(ref : string, category: string, name : string, version : string, photo : string, phone : string) {
        this.setRef(ref);
        this.category = category;
        this.setName(name);
        this.setVersion(version);
        this.setPhoto(photo);
        this.setPhone(phone);
        this.setLockDays(new Array());
    }

    // Getters
    public getRef() : string {
        return this.ref;
    }

    public getCategory() : string {
        return this.category;
    }

    public getName() : string {
        return this.name;
    }

    public getVersion() : string {
        return this.version;
    }

    public getPhoto() : string {
        return this.photo;
    }

    public getPhone() : string {
        return this.phone;
    }

    public getLockDays() : string[] {
        return this.lockDays;
    }


    // Setters
    public setRef(ref : string) : void {
        if(ref.length != 5) {
            throw new Error("Invalid reference");
        }

        this.ref = ref;
    }

    public setName(name : string) : void {

        if(name.length == 0 || name.length > 30) {
            throw new Error("Invalid name");
        }

        this.name = name;
    }

    public setVersion(version : string) : void {

        if(version.length < 3 || version.length > 15) {
            throw new Error("Invalid version");
        }

        this.version = version;
    }

    public setPhoto(photo : string) : void {
        
        /*if(photo.length == 0) {
            throw new Error("Invalid photo");
        }*/

        this.photo = photo;
    }

    public setPhone(phone : string) : void {

        if(!phone || phone.length > 14) {
            throw new Error("Invalid phone number")
        }

        this.phone = phone;
    }

    public setLockDays(lockDays : string[]) : void {
        this.lockDays = lockDays;
    }
}