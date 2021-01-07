export default class Reservation {
    private ID!: number;
    private refDevice!: string;
    private idUser!: string;
    private startDate!: string;
    private endDate!: string;
    private returnDate!: string;

    constructor(ID : number, refDevice: string, idUser : string, startDate : string, endDate : string, returnDate : string) {

        if(!ID || ID < 0) {
            throw new Error("Invalid ID");
        }

        if(!refDevice || refDevice.length != 5) {
            throw new Error("Invalid device reference");
        }

        if(!idUser || idUser.length != 7) {
            throw new Error("Invalid user id");
        }

        if(!startDate || startDate.length != 10) {
            throw new Error("Invalid start date");
        }

        if(!endDate || endDate.length != 10) {
            throw new Error("Invalid end date");
        }

        if(endDate && endDate.length != 10) {
            throw new Error("Invalid return date");
        }

        this.ID = ID;
        this.refDevice = refDevice;
        this.idUser = idUser;
        this.startDate = startDate;
        this.endDate = endDate;
        this.returnDate = returnDate;
    }

    public getID() : number {
        return this.ID;
    }

    public getDevice() : string {
        return this.refDevice;
    }

    public getUser() : string {
        return this.idUser;
    }

    public getStartDate() : Date {
        return new Date(this.startDate);
    }

    public getEndDate() : Date {
        return new Date(this.endDate);
    }

    public hasReturnDate() : boolean {
        return !this.returnDate;
    }

    public getReturnDate() : Date {

        if(!this.returnDate) {
            throw new Error("Return date is undefined");
        }

        return new Date(this.returnDate);
    }
}