import fs from 'fs';
import {Customer} from '../models/customer.js';

const updateCustomer = async (req, res) => {
    const { id, first_name, last_name, handles } = req.body.contact;
    if (!id) {
        res.send("Invalid data");
        return;
    }
    res.send("recieved");
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
    const customerIndex = customerData.customers.findIndex(customer => customer.contact_id === id);
    if (customerIndex === -1) {
        return;
    }
    customerData.customers[customerIndex] = newCustomerObj;
    fs.writeFileSync('./src/data/customers.json', JSON.stringify(customerData, null, 2));
    return;
};

export default updateCustomer;