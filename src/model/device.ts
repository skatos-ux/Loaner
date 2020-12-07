import { version } from "punycode";

export default class Device {
    private ref!: string;
    // TODO : Ajouter la catégorie
    private name!: string;
    private version!: string;
    private pictureUrl!: string;
    private phone!: string;

    public Device(ref : string, name : string, version : string, pictureUrl : string, phone : string) {
        this.ref = ref;
        this.name = name;
        this.version = version;
        this.pictureUrl = pictureUrl;
        this.phone = phone;
    }

    public getRef() : string {
        return this.ref;
    }

    public getName() : string {
        return this.name;
    }

    public getVersion() : string {
        return this.version;
    }

    public getPictureURL() : string {
        return this.pictureUrl;
    }

    public getPhone() : string {
        return this.phone;
    }

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

    public setPictureURL(pictureUrl : string) : void {
        
        if(pictureUrl.length == 0) {
            throw new Error("Invalid picture");
        }

        this.pictureUrl = pictureUrl;
    }

    public setPhone(phone : string) : void {

        if(phone.length == 0) {
            throw new Error("Invalid phone number")
        }

        this.phone = phone;
    }
}