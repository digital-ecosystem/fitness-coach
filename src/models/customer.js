class Customer {
    constructor(contact_id, first_name, last_name, email, phone) {
        this.contact_id = contact_id;
        this.first_name = first_name ? first_name : null;
        this.last_name = last_name ? last_name : null;
        this.email = email ? email : null;
        this.phone = phone ? phone : null;
    }
}

export { Customer };