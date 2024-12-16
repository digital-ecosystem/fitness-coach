import { Router } from "express";
import  updateCustomer  from "../controllers/update_customer.js";

const router = Router();

router.post("/update_customer", updateCustomer);

export default router;