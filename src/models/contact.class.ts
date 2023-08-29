export class Contact {
    firstName!: String;
    lastName!: String;
    birthDate!: Number;
    phone!: Number;
    email!: String;
    company!: String;
    street!: String;
    country!: string;
    zipCode!: Number;
    city!: String;
    category: String;
    notes!: String;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName =  obj ? obj.lastName : '';
        this.birthDate =  obj ? obj.birthDate : '';
        this.phone =  obj ? obj.phone : '';
        this.email =  obj ? obj.email : '';
        this.company =  obj ? obj.company : '';
        this.street =  obj ? obj.street : '';
        this.country =  obj ? obj.country : '';
        this.zipCode =  obj ? obj.zipCode : '';
        this.city =  obj ? obj.city : '';
        this.category =  obj ? obj.category : '';
        this.notes =  obj ? obj.notes : '';
    }
}