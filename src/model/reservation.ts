export default class Reservation {
    private ID!: number;
    private refDevice!: string;
    private idUser!: string;
    private startDate!: string;
    private endDate!: string;
    private returnDate!: string;

    constructor(ID: number, refDevice: string, idUser: string, startDate: string, endDate: string, returnDate: string) {

        if (!ID || ID < 0) {
            throw new Error("Invalid ID");
        }

        if (!refDevice || refDevice.length != 5) {
            throw new Error("Invalid device reference");
        }

        if (!idUser || idUser.length != 7) {
            throw new Error("Invalid user id");
        }

        if (!startDate || startDate.length != 10) {
            throw new Error("Invalid start date");
        }

        if (!endDate || endDate.length != 10) {
            throw new Error("Invalid end date");
        }

        if (endDate && endDate.length != 10) {
            throw new Error("Invalid return date");
        }

        this.ID = ID;
        this.refDevice = refDevice;
        this.idUser = idUser;
        this.startDate = startDate;
        this.endDate = endDate;
        this.returnDate = returnDate;
    }

    public getID(): number {
        return this.ID;
    }

    public getDevice(): string {
        return this.refDevice;
    }

    public getUser(): string {
        return this.idUser;
    }

    public getStartDate(): Date {
        return new Date(this.startDate);
    }

    public getEndDate(): Date {
        return new Date(this.endDate);
    }

    public hasReturnDate(): boolean {
        return !this.returnDate;
    }

    public getReturnDate(): Date {

        if (!this.returnDate) {
            throw new Error("Return date is undefined");
        }

        return new Date(this.returnDate);
    }

    public static convertDate(date: Date): string {
        let month = "" + (date.getMonth() + 1);
        let day = "" + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2)
            month = "0" + month;
        if (day.length < 2)
            day = "0" + day;

        return [year, month, day].join('-');
    }

    public getLockDays(): string[] {
        const startDate = this.getStartDate();
        let endDate: Date;

        if (this.hasReturnDate()) {
            endDate = this.getEndDate();
        } else {
            endDate = this.getReturnDate();
        }

        return [startDate, endDate].map(Reservation.convertDate);
    }
}