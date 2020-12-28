export default class User {
    private id!: number;
    private firstName!: string;
    private lastName!: string;
    private email!: string;
    private admin!: number;

    constructor(id: number, firstName: string, lastName: string, email: string, admin: number){
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.admin = admin;
    }

    //getters
    public getId() : number {
      return this.id;
    }

    public getFirstName() : string {
      return this.firstName;
    }

    public getLastName() : string {
      return this.lastName;
    }

    public getEmail() : string {
      return this.email;
    }

    public isAdmin() : number {
      return this.admin;
    }

    //setters
    public setId(id : number) : void {
      this.id = id;
    }

    public setFirstName(firstName : string) : void {
      this.firstName = firstName;
    }

    public setLastName(lastName : string) : void {
      this.lastName = lastName;
    }

    public setEmail(email : string) : void {
      this.email = email;
    }

    public setAdmin(admin : number) : void {
      this.admin = admin;
    }
}
