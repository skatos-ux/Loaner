export default class Reservation {
    private ID!: number;
    private refDevice!: string;
    private idUser!: string;
    private startDate!: string;
    private endDate!: string;
    private returnDate!: string;

    constructor(ID: number, refDevice: string, idUser: string, startDate: string, endDate: string, returnDate: string = "") {

        if (!ID || ID < 0) {
            throw new Error("Invalid ID");
        }

        if (!refDevice || refDevice.length != 5) {
            throw new Error("Invalid device reference");
        }

        if (!idUser || idUser.length != 7) {
            throw new Error("Invalid user id");
        }

        if (!startDate || startDate.length != 10 || !this.checkDate(startDate)) {
            throw new Error("Invalid start date");
        }

        if (!endDate || endDate.length != 10|| !this.checkDate(endDate)) {
            throw new Error("Invalid end date");
        }

        if (returnDate && ((returnDate.length != 0 && returnDate.length != 10) || !this.checkDate(returnDate))) {
            throw new Error("Invalid return date");
        }

        this.ID = ID;
        this.refDevice = refDevice;
        this.idUser = idUser;
        this.startDate = startDate;
        this.endDate = endDate;
        this.returnDate = returnDate;

        if(this.getStartDate() > this.getEndDate()) {
            throw new Error("Start date is after end date")
        }
    }

    private checkDate(dateString : string) : boolean {
        return !isNaN(Date.parse(dateString));
    }

    public getID(): number {
        return this.ID;
    }

    public getDevice(): string {
        return this.refDevice;
    }

    public getUserID(): string {
        return this.idUser;
    }

    public getStartDate(): Date {
        return new Date(this.startDate);
    }

    public getEndDate(): Date {
        return new Date(this.endDate);
    }

    public hasReturnDate(): boolean {
        return !!this.returnDate && this.returnDate.length != 0;
    }

    public getReturnDate(): Date {

        if (!this.hasReturnDate()) {
            throw new Error("Return date is undefined");
        }

        return new Date(this.returnDate);
    }

    public getLockDays(): string[] {
        const startDate = this.getStartDate();
        let endDate: Date;

        if (this.hasReturnDate()) {
            endDate = this.getReturnDate();
        } else {
            endDate = this.getEndDate();
        }

        return [startDate, endDate].map(Reservation.convertDate);
    }

    public static convertDate(date: Date): string {
        let month = "" + (date.getMonth() + 1);
        let day = "" + date.getDate();
        const year = date.getFullYear();

        if (month.length < 2)
            month = "0" + month;
        if (day.length < 2)
            day = "0" + day;

        return [year, month, day].join('-');
    }
}