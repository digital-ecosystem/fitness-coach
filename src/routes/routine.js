import { Router } from "express";
import cron from "node-cron";
import fs from "fs";
import { __dirname } from "../../index.js";
import {
  sendMessage,
  listAllContacts,
} from "../models/superchat.js";

const router = Router();


// cron.schedule("*/5 * * * * *", async () => {
//   console.log("running a task every minute seconds");
//   try {
//     const date = new Date();
//     date.setFullYear(2025);
//     date.setMonth(0); // January is month 0 in JavaScript
//     date.setDate(5);
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     console.log(month);
//   } catch (error) {
//     console.log(error);
//   }
// });

//0 14 * * *
cron.schedule("0 14 * * *", async () => {
  console.log("running a task at 14");
  try {
      let after = null;
      let results = [];
      const response = await listAllContacts(after);
      if (!response || !response.results) {
        return console.error("No results found for contacts in the listAllContacts function");
      }
      const templates = JSON.parse(
            fs.readFileSync(__dirname + "/src/data/templates.json", "utf-8")
      );
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const contacts = response.results;
      results = results.concat(contacts);
      if (response.pagination && response.pagination.next_cursor) {
        after = response.pagination.next_cursor;
      }
      while (after) {
        const response2 = await listAllContacts(after);
        if (!response2 || !response2.results) {
          break;
        }
        const contacts1 = response2.results;
        results = results.concat(contacts1);
        if (response2.pagination && response2.pagination.next_cursor) {
          after = response2.pagination.next_cursor;
        } else {
          after = null;
        }
      }
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        if (result.custom_attributes.length > 0)
        {
          const custom_attributes = result.custom_attributes;
          for (let index = 0; index < custom_attributes.length; index++) {
            const custom_attribute = custom_attributes[index];
           if (custom_attribute.id === 'ca_H6CNXrlKSHgBFcgXzJWgs' && custom_attribute.value === 'Opt In')
           {
            const todayTemplate = templates[month][day];
            const template_id = todayTemplate.training.template_id;
            const video_id = todayTemplate.training.id;
            await sendMessage(template_id, video_id, result.id);
            console.log("message for training was sent to contact id : " + result.id);
           } else {
            console.log("customer is not opt-in");
           }
          }
        } else {
          console.log("no attributes was found");
        }
      }
  } catch (error) {
    console.log(error);
  }
});

//0 10 * * *
cron.schedule("0 10 * * *", async () => {
  console.log("running a task at 10:00");
  try {
      let after = null;
      let results = [];
      const templates = JSON.parse(
        fs.readFileSync(__dirname + "/src/data/templates.json", "utf-8")
      );
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const response = await listAllContacts(after);
      if (!response || !response.results) {
        return console.error("No results found for contacts in the listAllContacts function");
      }
      const contacts = response.results;
      results = results.concat(contacts);
      if (response.pagination && response.pagination.next_cursor) {
        after = response.pagination.next_cursor;
      }
      while (after) {
        const response2 = await listAllContacts(after);
        if (!response2 || !response2.results) {
          break;
        }
        const contacts1 = response2.results;
        results = results.concat(contacts1);
        if (response2.pagination && response2.pagination.next_cursor) {
          after = response2.pagination.next_cursor;
        } else {
          after = null;
        }
      }
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        if (result && result.custom_attributes && result.custom_attributes.length > 0)
        {
          const custom_attributes = result.custom_attributes;
          for (let index = 0; index < custom_attributes.length; index++) {
            const custom_attribute = custom_attributes[index];
           if (custom_attribute.id === 'ca_H6CNXrlKSHgBFcgXzJWgs' && custom_attribute.value === 'Opt In')
           {
            const todayTemplate = templates[month][day];
            const template_id = todayTemplate.recipe.template_id;
            const video_id = todayTemplate.recipe.id;
            await sendMessage(template_id, video_id, result.id);
            console.log("message for training was sent to contact id : " + result.id);
           } else {
            console.log("customer is not opt-in");
           }
          }
        } else {
          console.log("no attributes was found");
        }
      }
  } catch (error) {
    console.log(error);
  }
});

export default router;
