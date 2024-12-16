import { Router } from "express";
import cron from "node-cron";
import fs from "fs";
import { __dirname } from "../../index.js";
import {
  getConveration,
  getSuperchatRecord,
  updateSuperchatRecord,
  sendMessage,
} from "../models/superchat.js";

const router = Router();



let index = 0;
cron.schedule("* * * * *", async () => {
  console.log("running a task every 15 seconds");
  try {
    const data = JSON.parse(
      fs.readFileSync(__dirname + "/src/data/customers.json", "utf-8")
    );
    const templates = JSON.parse(
      fs.readFileSync(__dirname + "/src/data/templates.json", "utf-8")
    );
    const customers = data.customers;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    for (let index = 0; index < customers.length; index++) {
      const customer = customers[index];
      const contact_id = customer.contact_id;
      const firstName = customer.first_name;
      const lastName = customer.last_name;
      const todayTemplate = templates[month][day];
      const template_id = todayTemplate.video.template_id;
      const video_id = todayTemplate.video.id;
      await sendMessage(template_id, video_id, contact_id);
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
