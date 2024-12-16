import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import { config } from "dotenv";
import create from "./src/routes/create_customer.js";
import update from "./src/routes/update_customer.js";
import home from "./src/routes/home.js";
import routine from "./src/routes/routine.js";


config();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const NGROK_AUTHTOKEN = process.env.NGROK_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use(create);
app.use(update);
app.use(home);
app.use(routine);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost: " + PORT);
});
