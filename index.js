import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import { config } from "dotenv";
//import create from "./src/routes/create_customer.js";
//import update from "./src/routes/update_customer.js";
import home from "./src/routes/home.js";
import routine from "./src/routes/routine.js";
import {
  listAllContacts, 
  sendMessage,
} from "./src/models/superchat.js";
import fs from 'fs';


config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const NGROK_AUTHTOKEN = process.env.NGROK_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//app.use(create);
//app.use(update);
app.use(home);
app.use(routine);

async function all() {
  let after = null;
  let results = [];
  const response = await listAllContacts(after);
  const templates = JSON.parse(
        fs.readFileSync(__dirname + "/src/data/templates.json", "utf-8")
  );
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const contacts = response.results;
  results = results.concat(contacts);
  after = response.pagination.next_cursor;
  while (after) {
    const response2 = await listAllContacts(after);
    const contacts1 = response2.results;
    results = results.concat(contacts1);
    after = response2.pagination.next_cursor;
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
        const template_id = todayTemplate.video.template_id;
        const video_id = todayTemplate.video.id;
        await sendMessage(template_id, video_id, result.id);
        console.log("here");
       }
      }
    }
  }
}

app.listen(PORT, () => {
  console.log("Server is running on http://localhost: " + PORT);
});
