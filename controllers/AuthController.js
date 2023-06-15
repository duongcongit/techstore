import bcrypt from "bcrypt";
import { DateTime } from "luxon";

import jwtHelper from '../helpers/JWTHelper.js';

import User from "../models/User.js";
import Role from "../models/Role.js";

const SALT_ROUNDS = 10;


class AuthController {

    // Login
    login = (req, res) => {

        // Get tokens from .env
        let accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        let accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

        let refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
        let refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

        // Get data from client
        let username = req.body.username.toLowerCase();

        // Check account is exists or not
        User.findOne({ username: username })
            .then(acc => {
                if (acc) {
                    // Check password
                    bcrypt.compare(req.body.password, acc.password, async (err, result) => {
                        if (result) {
                            let dataForToken = {
                                username: acc.username,
                                name: acc.name
                            };
                            //
                            try {
                                // Create access token
                                let accessToken = await jwtHelper.generateToken(dataForToken, accessTokenSecret, accessTokenLife);
                                // Create refresh token
                                let refreshToken = await jwtHelper.generateToken(dataForToken, refreshTokenSecret, refreshTokenLife);
                                // Send tokens to client
                                return res.status(200).json({ accessToken, refreshToken });
                            }
                            catch (error) { // Error
                                return res.status(500).json(error);
                            }

                        }
                        else { // Wrong password
                            res.status(401).send("Wrong password");
                        }
                    })
                }
                else { // Account not found
                    res.status(404).send("Account not found!");
                }
            })
    }

    // Register
    register = (req, res) => {

        let username = req.body.username.toLowerCase();
        let email = req.body.email;

        let customerID = "CUS" + (Math.floor(Math.random() * 89) + 10) + Math.random().toString(36).slice(2, 6);
        customerID = customerID.toUpperCase();

        User.findOne({ email: email })
            .then(user => {
                if (user) return res.status(409).json({ Error: "Email is existed." });
                User.findOne({ username: username })
                    .then(user => {
                        if (user) return res.status(409).json({ Error: "Username is existed." });

                        Role.findOne({ name: "customer" })
                            .then(role => {

                                let hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
                                let accountInfo = {
                                    userID: customerID,
                                    username: username,
                                    fullname: req.body.fullname,
                                    email: email,
                                    address: req.body.address,
                                    password: hashPassword,
                                    status: 0,
                                    roles: ["customer"],
                                    createAt: DateTime.utc().toISO(),
                                    deleteAt: null,
                                    activeAt: null,
                                    activeCode: null

                                };
                                let account = new User(accountInfo);
                                // Save
                                account.save()
                                    .then(() => res.json({
                                        Result: "Register account successfully."
                                    }))

                            })
                    })
            })


        //

    }

    // Refresh token for admin
    /* resfreshTokenForAdmin = async (req, res) => {
        // Get tokens from .env
        let accessTokenLife = process.env.ADMIN_ACCESS_TOKEN_LIFE;
        let accessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;

        let refreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;

        // Get refresh token fromm client
        let refreshTokenFromClient = req.body.refreshToken || req.query.refreshToken || req.headers["refresh-token"];

        // Get data from client
        let username = req.body.username;
        let name = req.body.name;

        // Verify refresh token
        if (refreshTokenFromClient) {
            try {
                const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

                if (username != decoded.data.username || name != decoded.data.name) {
                    return res.status(401).send("Wrong refresh token!");
                }
                // Check account is exists or not
                Admin.findOne({ username: username })
                    .then(async acc => {
                        if (acc) {
                            //
                            let dataForToken = {
                                username: acc.username,
                                name: acc.name
                            };
                            //
                            try {
                                // Create new access token
                                let accessToken = await jwtHelper.generateToken(dataForToken, accessTokenSecret, accessTokenLife);
                                // Send token to client
                                return res.status(200).json({ accessToken });
                            }
                            catch (error) { // Error
                                return res.status(500).json(error);
                            }
                        }
                        else { // Not found account
                            res.status(404).send("Not found user!");
                        }
                    })
            }
            catch (error) { // Unauthorized refresh token
                return res.status(401).json({
                    message: 'Unauthorized refresh token.',
                });
            }
        }
        else { // No refresh token provided
            return res.status(401).json({
                message: 'No refresh token provided.',
            });
        }


    } */




}

export default new AuthController();