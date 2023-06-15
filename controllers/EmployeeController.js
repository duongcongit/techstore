import { DateTime } from "luxon";

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

class EmployeeController {

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

    // Add Product
    addProduct = async (req, res) => {
        let currentTime = DateTime.utc().toISO(); // Current time
        // Generate random product ID
        let productID = "PRD" + (Math.floor(Math.random() * 89) + 10) + Math.random().toString(36).slice(2, 6);
        productID = productID.toUpperCase();
        // Check product ID is extist or not
        Product.findOne({ productID: productID })
            .then(product => {
                // If already have product with this ID, create new ID
                if (product) { return this.addProduct(req, res); }
                // Check SKU code
                this.checkSKU(req, res, () => {
                    let productInfo = {
                        productID: productID,
                        productName: req.body.productName,
                        SKU: req.body.SKU,
                        detail: req.body.detail,
                        stock: req.body.stock,
                        sold: 0,
                        price: req.body.price,
                        status: 1,
                        category: req.body.category,
                        brand: req.body.brand,
                        productImage: req.body.productImage
                    };
                    // Add product
                    let newProduct = new Product(productInfo);
                    newProduct.save()
                        .then(() =>
                            res.status(201).json({ Result: "Add product successfully." })
                        )
                        .catch(error => {
                            return res.status(500).send(error);
                        });
                })


            })


    }

    // Check SKU
    checkSKU = async (req, res, next) => {
        let SKU = req.body.SKU;
        Product.findOne({ SKU: SKU })
            .then(product => {
                if (product) {
                    return res.status(409).json({
                        message: 'SKU code is existed!.',
                    });
                }
                next();
            })
    }

    // Add Category
    addCategory = async (req, res) => {
        let categoryID = req.body.categoryID;
        let categoryName = req.body.categoryName;
        // Check category is exists or not
        Category.find({
            $or: [
                { "categoryID": categoryID },
                { "categoryName": categoryName }
            ]
        }).then(categories => {
            // If category is already existed
            if (categories.length > 0) {
                return res.status(409).json({
                    Message: "Failed! Category is existed!"
                })
            }
            // Data
            let categoryInfo = {
                categoryID: categoryID,
                categoryName: categoryName
            }
            // Add new category
            let newCategory = new Category(categoryInfo);
            newCategory.save()
                .then(() =>
                    res.status(201).json({ Result: "Add Category successfully." })
                )
                .catch(error => {
                    return res.status(500).send(error);
                });

        })

    }

    // Add Brand
    addBrand = async (req, res) => {
        let brandID = req.body.brandID;
        let brandName = req.body.brandName;
        // Check Brand is exist or not
        Brand.find({
            $or: [
                { "brandID": brandID },
                { "brandName": brandName }
            ]
        }).then(brands => {
            // If brand is already existed
            if (brands.length > 0) {
                return res.status(409).json({
                    Message: "Failed! Brand is existed!"
                })
            }
            // Data
            let brandInfo = {
                brandID: brandID,
                brandName: brandName
            }
            // Add new brand
            let newBrand = new Brand(brandInfo);
            newBrand.save()
                .then(() =>
                    res.status(201).json({ Result: "Add Brand successfully." })
                )
                .catch(error => {
                    return res.status(500).send(error);
                });

        })
    }

}

export default new EmployeeController();