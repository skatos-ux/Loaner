export default class Category {
    private ID!: number;
    private name!: string;

    constructor(ID : number, name : string) {
        this.ID = ID;
        this.name = name;
    }

    public getID() : number {
        return this.ID;
    }

    public getName() : string {
        return this.name;
    }

    public setID(ID : number) : void {
        this.ID = ID;
    }

    public setName(name : string) : void {

        if(this.name.length == 0 || this.name.length > 255) {
            throw new Error("Invalid name");
        }

        this.name = name;
    }
}