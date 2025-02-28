import { config } from "dotenv";
import { initServer } from "./configs/server.js";
import { addAdmin } from "./configs/createAdmin.js";

config();
initServer();
addAdmin();
