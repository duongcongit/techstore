import express from 'express';
const router = express.Router();


const initAPIRoute = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.text());

    app.get('/', (req, res)=>{
        res.send('HOME PAGE')
    })

}

export default initAPIRoute;