import { DateTime } from "luxon";

import Product from "../models/Product.js";
import Category from "../models/Category.js";




class HomeController {

    // Get all products
    getAllProducts = (req, res) => {
        // Get products
        Product.find({}, { _id: 0, __v: 0, password: 0 })
            .then(products => {
                res.status(200).send(products)
            })
            .catch(err => {
                return res.status(500).send(err);
            })
    }

    // Get products available
    getProductsAvailable = (req, res) => {
        // Get products, status = 1
        Product.find({ $and: [{ status: 1 }, { stock: { $gt: 0 } }] }, { _id: 0, __v: 0, password: 0 })
            .then(products => {
                res.status(200).send(products)
            })
            .catch(err => {
                return res.status(500).send(err);
            })

    }

    // Get products by category
    getProductsByCategory = (req, res) => {
        let categorySlug = req.params.category;

        // Check Category
        Category.findOne({ slug: categorySlug })
            .then(category => {
                if (!category) { // Category not found
                    return res.status(404).json({ Error: "Category not found!" })
                }
                // Get products
                Product.find({ category: categorySlug }, { _id: 0, __v: 0, password: 0 })
                    .then(products => {
                        res.status(200).send(products)
                    })
                    .catch(err => {
                        return res.status(500).send(err);
                    })

            })




    }

}

export default new HomeController();