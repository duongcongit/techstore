import express from 'express';
const router = express.Router();

import authRouter from './AuthRouter.js';
import adminRouter from './AdminRouter.js';


const initAPIRoute = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.text());

    app.get('/', (req, res)=>{
        res.send('HOME PAGE')
    })

    app.use('/auth', authRouter);
    app.use('/api/admin', adminRouter)

}

export default initAPIRoute;