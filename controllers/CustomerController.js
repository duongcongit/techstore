import { DateTime } from "luxon";
import bcrypt from "bcrypt";

import jwtHelper from '../helpers/JWTHelper.js';

import User from '../models/User.js';
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

const SALT_ROUNDS = 10;

class CustomerController {

    // Get user profile
    getProfile = async (req, res) => {
        let username = req.jwtDecoded.data.username;
        User.findOne({ username: { $regex: username, $options: 'i' } }, { _id: 0, __v: 0, password: 0 })
            .then(acc => {
                if (!acc) { // Not found
                    return res.status(404).json({
                        status: "error",
                        Error: "Account not found!"
                    })
                }
                // Result
                return res.status(200).json({
                    status: "ok",
                    message: null,
                    data: acc
                })
            })

    }

    // Update profile
    updateProfile = async (req, res) => {
        let username = req.jwtDecoded.data.username;

        let accountInfo = { // Data for update
            fullname: req.body.fullname,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        };
        // Update
        User.findOneAndUpdate({ username: username }, accountInfo)
            .then(acc => {
                if (!acc) { // Not 
                    return res.status(404).json({
                        status: "error",
                        Error: "Account not found!"
                    })
                }
                // Update successfully
                return res.status(200).json({
                    Result: "Update account info successfully!",
                    username: username
                })
            })
            .catch(err => { // Error
                return res.status(500).send(err);
            })

    }

    // Change password
    changePassword = async (req, res) => {
        let username = req.jwtDecoded.data.username;
        let newPassword = req.body.newPassword;
        let hashPassword = bcrypt.hashSync(newPassword, SALT_ROUNDS);
        // Update
        User.findOneAndUpdate({ username: username }, { password: hashPassword })
            .then(acc => {
                if (!acc) { // Not found
                    return res.status(404).json({
                        status: "error",
                        Error: "Account not found!"
                    })
                }
                // Update successfully
                return res.status(200).json({
                    Result: "Change password successfully!",
                    username: username
                })
            })
            .catch(err => { // Error
                return res.status(500).send(err);
            })
    }

    // ============ CART ================
    // Get cart detail
    getCartDetail = async (req, res) => {
        let username = req.jwtDecoded.data.username;
        // Get all products in cart and detail
        Cart.aggregate([
            { $match: { username: { $regex: username, $options: 'i' } } }, // Match username
            { $project: { _id: 0, __v: 0, username: 0 } }, // Exclude _id and __v
            {
                $lookup: { // Get product detail
                    from: "products",
                    localField: "productID",
                    foreignField: "productID",
                    as: "detail",
                    pipeline: [
                        { $project: { _id: 0, __v: 0 } } // Exclude _id and __v
                    ]
                }
            }
        ])
            .then(products => {
                // Result
                return res.status(200).json({
                    status: "ok",
                    username: username,
                    message: { Fetched: products.length },
                    data: products
                })
            })

    }

    // Add product to cart
    addOrUpdateCart = async (req, res) => {
        let username = req.jwtDecoded.data.username;
        // Data
        let data = {
            username: username,
            productID: req.body.productID,
            quantity: req.body.quantity,
            timeAdd: DateTime.utc().toISO(),
        }
        // Update quantity, if not exist, add new
        Cart.findOneAndUpdate(
            { username: username, productID: req.body.productID },
            data,
            { upsert: true }
        )
            .then((product) => { // 
                return res.status(201).json({ Result: "Add or update cart successfully." })
            })
            .catch(error => {
                return res.status(500).send(error);
            });
    }

    // Delete product from cart
    deleteFromCart = async (req, res) => {
        let username = req.jwtDecoded.data.username;
        let productID = req.body.productID;
        // Delete
        Cart.findOneAndRemove({ username: username, productID: productID })
            .then(product => {
                return res.status(200).json({
                    Result: "Delete product from cart successfully!"
                })
            })
            .catch(err => { // Error
                return res.status(500).send(err);
            })
    }

    // Order
    order = async (req, res) => {

    }

    // Get receipt detail
    getReceiptDetail = async (req, res) => {
        
    }

}

export default new CustomerController();