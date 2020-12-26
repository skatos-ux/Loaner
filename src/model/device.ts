import Category from './category';

export default class Device {
    private ref!: string;
    private category!: Category;
    private name!: string;
    private version!: string;
    private photo!: string;
    private phone!: string;
    private available!: boolean;

    constructor(ref : string, category: Category, name : string, version : string, photo : string, phone : string, available: boolean) {
        this.ref = ref;
        this.category = category;
        this.name = name;
        this.version = version;
        this.photo = photo;
        this.phone = phone;
        this.available = available;
    }

    public getRef() : string {
        return this.ref;
    }

    public getCategory() : Category {
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

    public isAvailable() : boolean {
        return this.available;
    }

    // A laisser ?
    public setRef(ref : string) : void {

        if(ref.length != 5) {
            throw new Error("Invalid reference");
        }

        this.ref = ref;
    }

    // A laisser ?
    public setCategory(category : Category) : void {
        this.category = category;
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
        
        if(photo.length == 0) {
            throw new Error("Invalid photo");
        }

        this.photo = photo;
    }

    public setPhone(phone : string) : void {

        if(phone.length == 0) {
            throw new Error("Invalid phone number")
        }

        this.phone = phone;
    }
}