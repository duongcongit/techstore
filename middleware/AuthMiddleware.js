import jwtHelper from '../helpers/JWTHelper.js';

import User from "../models/User.js";
import Role from "../models/Role.js";

class AuthMiddleWare {

    // Auth
    isAuth = async (req, res, next) => {
        // Get token from .env
        const AccessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        // Get token from client
        const TokenFromClient = req.body.token || req.query.token || req.headers['access-token'];

        // Verify token
        if (TokenFromClient) {
            try {
                // Verify token
                const decoded = await jwtHelper.verifyToken(TokenFromClient, AccessTokenSecret);
                req.jwtDecoded = decoded;

                next();
            }
            catch (error) { // Error
                return res.status(401).json({
                    message: 'Unauthorized.',
                });

            }
        }
        else { // No token
            return res.status(401).json({
                message: 'No token provided.',
            });
        }

    }

    // Root
    isRootAuth = async (req, res, next) => {

        // Get data from client
        let username = req.jwtDecoded.data.username.toLowerCase();

        // Check account
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    // Check role
                    for (let i = 0; i < user.roles.length; i++) {
                        if ( user.roles[i] === "root") {
                            next();
                            return;
                        }
                    }
                    // Without ADMIN role
                    res.status(403).send({ message: "Require Root Role!" });
                    return;
                }
                else { // Account not found
                    res.status(404).send("Account not found!");
                }
            })

    }

    // Admin
    isAdminAuth = async (req, res, next) => {

        // Get data from client
        let username = req.jwtDecoded.data.username.toLowerCase();

        // Check account
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    // Check role
                    for (let i = 0; i < user.roles.length; i++) {
                        if ( user.roles[i] === "admin") {
                            next();
                            return;
                        }
                    }
                    // Without ADMIN role
                    res.status(403).send({ message: "Require Admin Role!" });
                    return;
                }
                else { // Account not found
                    res.status(404).send("Account not found!");
                }
            })

    }

    // Employee
    isEmployeeAuth = async (req, res, next) => {

        // Get data from client
        let username = req.jwtDecoded.data.username.toLowerCase();

        // Check account
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    // Check role
                    for (let i = 0; i < user.roles.length; i++) {
                        if ( user.roles[i] === "employee") {
                            next();
                            return;
                        }
                    }
                    // Without ADMIN role
                    res.status(403).send({ message: "Require Employee Role!" });
                    return;
                }
                else { // Account not found
                    res.status(404).send("Account not found!");
                }
            })

    }

    // Customer
    isCustomerAuth = async (req, res, next) => {

        // Get data from client
        let username = req.jwtDecoded.data.username.toLowerCase();

        // Check account
        User.findOne({ username: username })
            .then(user => {
                if (user) {
                    // Check role
                    for (let i = 0; i < user.roles.length; i++) {
                        if ( user.roles[i] === "customer") {
                            next();
                            return;
                        }
                    }
                    // Without ADMIN role
                    res.status(403).send({ message: "Require Customer Role!" });
                    return;
                }
                else { // Account not found
                    res.status(404).send("Account not found!");
                }
            })

    }


}




export default new AuthMiddleWare();