import bcrypt from "bcrypt";

import jwtHelper from '../helpers/JWTHelper.js';

import Admin from "../models/Admin.js";


class AuthController {

    // Admin login
    loginAdmin = (req, res) => {

        // Get tokens from .env
        let adminAccessTokenLife = process.env.ADMIN_ACCESS_TOKEN_LIFE;
        let adminAccessTokenSecret = process.env.ADMIN_ACCESS_TOKEN_SECRET;

        let adminRefreshTokenLife = process.env.ADMIN_REFRESH_TOKEN_LIFE;
        let adminRefreshTokenSecret = process.env.ADMIN_REFRESH_TOKEN_SECRET;

        // Get data from client
        let username = req.body.username.toLowerCase();

        // Check account is exists or not
        Admin.findOne({ username: username })
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
                                let accessToken = await jwtHelper.generateToken(dataForToken, adminAccessTokenSecret, adminAccessTokenLife);
                                // Create refresh token
                                let refreshToken = await jwtHelper.generateToken(dataForToken, adminRefreshTokenSecret, adminRefreshTokenLife);
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

    // Refresh token for admin
    resfreshTokenForAdmin = async (req, res) => {
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

                if(username != decoded.data.username || name != decoded.data.name){
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


    }


}

export default new AuthController();