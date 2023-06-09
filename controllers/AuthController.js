import { DateTime } from "luxon";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import crypto from "crypto-js";

import jwtHelper from '../helpers/JWTHelper.js';

import Admin from "../models/Admin.js";
import User from "../models/Customer.js";

// import AuthMiddleWare from '../middleware/AuthMiddleware.js';

const SALT_ROUNDS = 10;


class AuthController {

    // Admin login
    loginAdmin = (req, res) => {

        // let hashPassword = bcrypt.hashSync("admin", SALT_ROUNDS);
        // return res.status(200).send(hashPassword);

        let adminAccessTokenLife = process.env.ADMIN_ACCESS_TOKEN_LIFE;
        let adminAccessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;

        let adminRefreshTokenLife = process.env.ADMIN_REFRESH_TOKEN_LIFE;
        let adminRefreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;

        let username = req.body.username.toLowerCase();

        Admin.findOne({ username: username })
            .then(acc => {
                if (acc) {
                    bcrypt.compare(req.body.password, acc.password, async (err, result) => {
                        if (result) {
                            let dataForToken = {
                                username: acc.username,
                                name: acc.name
                            };
                            //
                            try {
                                let accessToken = await jwtHelper.generateToken(dataForToken, adminAccessTokenSecret, adminAccessTokenLife);
                                //
                                let refreshToken = await jwtHelper.generateToken(dataForToken, adminRefreshTokenSecret, adminRefreshTokenLife);
                                //
                                return res.status(200).json({ accessToken, refreshToken });
                            }
                            catch (error) {
                                return res.status(500).json(error);
                            }

                        }
                        else {
                            res.status(401).send("Wrong password");
                        }
                    })
                }
                else {
                    res.status(401).send("Not found username!");
                }
            })
    }


}

export default new AuthController();