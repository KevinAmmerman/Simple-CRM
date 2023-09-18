export class Contact {
    firstName!: string;
    lastName!: string;
    birthDate!: number;
    phone!: number;
    email!: string;
    company!: string;
    street!: string;
    country!: string;
    zipCode!: number;
    city!: string;
    category: string;
    reminder_qty!: number;
    reminder_period!: any;
    last_interaction: number;
    next_interaction: number;
    nextIntDays: number;
    notes!: any;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.phone = obj ? obj.phone : '';
        this.email = obj ? obj.email : '';
        this.company = obj ? obj.company : '';
        this.street = obj ? obj.street : '';
        this.country = obj ? obj.country : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.category = obj ? obj.category : '-';
        this.reminder_qty = obj ? obj.reminder_qty : '';
        this.reminder_period = obj ? obj.reminder_period : [];
        this.last_interaction = obj ? obj.last_interaction : '';
        this.next_interaction = obj ? obj.next_interaction : '';
        this.nextIntDays = obj ? obj.nextIntDays : '';
        this.notes = obj && obj.notes ? obj.notes : [];
    }

    public toJson() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            phone: this.phone,
            email: this.email,
            company: this.company,
            street: this.street,
            country: this.country,
            zipCode: this.zipCode,
            city: this.city,
            category: this.category,
            reminder_qty: this.reminder_qty,
            reminder_period: this.reminder_period,
            last_interaction: this.last_interaction,
            next_interaction: this.next_interaction,
            nextIntDays: this.nextIntDays,
            notes: this.notes
        }
    }
}