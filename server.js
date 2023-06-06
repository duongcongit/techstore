import express from "express";
import path from "path";
import * as dotenv from 'dotenv';

import db from "./config/db.js";
import route from "./routes/index.js";

dotenv.config({path: './.env'})

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')))


route(app)


db.connect()

app.listen(port, () => {console.log(`RESTFUL API server started on ${port}`);});