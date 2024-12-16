import { Router } from "express";
import  create_customer  from "../controllers/create_customer.js";

const router = Router();

router.post("/create_customer", create_customer);

export default router;