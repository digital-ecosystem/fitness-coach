import fs from 'fs';
import { Customer } from '../models/customer.js';

const create_customer = async (req, res) => {
    const { id, first_name, last_name, handles } = req.body.contact;
    if (!id) {
        res.send("Invalid data");
        return;
    }
    let email = null, phone = null;
    for (const handle of handles) {
        if (handle.type === 'mail') {
            email = handle.value;
        } else if (handle.type === 'phone') {
            phone = handle.value;
        }
    }
    const newCustomer = new Customer(id, first_name, last_name, email, phone);
    const newCustomerObj = {
        contact_id: newCustomer.contact_id,
        first_name: newCustomer.first_name,
        last_name: newCustomer.last_name,
        email: newCustomer.email,
        phone: newCustomer.phone
    };
    const customerData = JSON.parse(fs.readFileSync('./src/data/customers.json', 'utf-8'));
    customerData.customers.push(newCustomerObj);
    fs.writeFileSync('./src/data/customers.json', JSON.stringify(customerData, null, 2));
    res.send("Customer created successfully");
};

export default create_customer;