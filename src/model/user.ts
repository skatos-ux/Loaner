export default class User {
    private idUser!: number;
    private firstName!: string;
    private lastName!: string;
    private email!: string;
    private admin!: number;
    // private password!: string;

    constructor(idUser: number, firstName: string, lastName: string, email: string, admin: number){
      this.idUser = idUser;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.admin = admin;
    }

    //getters
    public getIdUser() : number {
      return this.idUser;
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

    public getAdmin() : number {
      return this.admin;
    }

    //setters
    public setIdUser(idUser : number) : void {
      this.idUser = idUser;
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
