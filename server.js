import express from "express";
import path from "path";
import * as dotenv from 'dotenv';


const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res)=>{
    res.send('HOME PAGE')
})

app.listen(port, () => {console.log(`RESTFUL API server started on ${port}`);});