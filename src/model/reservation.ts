export default class Reservation {
    private ID!: number;
    private refDevice!: string;
    private idUser!: string;
    private startDate!: Date;
    private endDate!: Date;
    private returnDate!: Date;

    constructor(ID : number, refDevice: string, idUser : string, startDate : Date, endDate : Date, returnDate : Date) {
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
        return this.startDate;
    }

    public getEndDate() : Date {
        return this.endDate;
    }

    public getReturnDate() : Date {
        return this.returnDate;
    }
}