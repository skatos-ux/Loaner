export default class User {
    private id!: number;
    private firstName!: string;
    private lastName!: string;
    private email!: string;
    private admin!: boolean;
    private temporaryPassword!: boolean;

    constructor(id: number, firstName: string, lastName: string, email: string, admin: boolean, temporaryPassword: boolean){
      this.setId(id);
      this.setFirstName(firstName);
      this.setLastName(lastName);
      this.setEmail(email);
      this.setAdmin(admin);
      this.setTemporaryPassword(temporaryPassword);
    }

    // Getters
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

    public isAdmin() : boolean {
      return this.admin;
    }

    public hasTemporaryPassword() : boolean {
      return this.temporaryPassword;
    }

    // Setters
    public setId(id: number) : void {
      this.id = id;
    }

    public setFirstName(firstName : string) : void {

      if(!firstName || firstName.length == 0 || firstName.length > 30) {
        throw new Error("Invalid firstname");
      }
      
      this.firstName = firstName;
    }

    public setLastName(lastName : string) : void {
      if(!lastName || lastName.length == 0 || lastName.length > 30) {
        throw new Error("Invalid lastname");
      }

      this.lastName = lastName;
    }

    public setEmail(email : string) : void {
      
      if(!email || email.length == 0 || email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+/g)?.length != 1) {
        throw new Error("Invalid email");
      }
      
      this.email = email;
    }

    public setAdmin(admin : boolean) : void {
      this.admin = admin;
    }

    public setTemporaryPassword(temporaryPassword: boolean): void {
      this.temporaryPassword = temporaryPassword;
    }
}