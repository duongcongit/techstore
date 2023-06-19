import express from 'express';
import cors from 'cors';


const router = express.Router();

import authRouter from './AuthRouter.js';
import homeRouter from './HomeRouter.js';
import adminRouter from './AdminRouter.js';
import employeeRouter from './EmployeeRouter.js';
import customerRouter from './CustomerRouter.js';
import validationRouter from './ValidationRouter.js';


const initAPIRoute = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.text());

    app.use(cors());

    app.get('/', (req, res) => {
        res.send('HOME PAGE')
    })

    app.use('/auth', authRouter);
    app.use('/api/home', homeRouter)
    app.use('/api/admin', adminRouter)
    app.use('/api/employee', employeeRouter)
    app.use('/api/customer', customerRouter)
    app.use('/api/validation', validationRouter)


}

export default initAPIRoute;