import { DateTime } from "luxon";

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

class EmployeeController {

    // ==================== GET ====================
    // Get all products
    getAllProducts = (req, res) => {
        // Get products
        Product.find({}, { _id: 0, __v: 0 })
            .then(products => {
                let data = {
                    status: "ok",
                    message: { Fetched: products.length },
                    data: products
                }
                return res.status(200).send(data)
            })
            .catch(err => {
                return res.status(500).send(err);
            })
    }

    // Get products available
    getProductsAvailable = (req, res) => {
        // Get products, status = 1
        Product.find({ $and: [{ status: 1 }, { stock: { $gt: 0 } }] }, { _id: 0, __v: 0 })
            .then(products => {
                let data = {
                    status: "ok",
                    message: { Fetched: products.length },
                    data: products
                }
                return res.status(200).send(data)
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
                Product.find({ category: category.categoryID }, { _id: 0, __v: 0 })
                    .then(products => {
                        let data = {
                            status: "ok",
                            message: { Fetched: products.length },
                            data: products
                        }
                        return res.status(200).send(data)
                    })
                    .catch(err => {
                        return res.status(500).send(err);
                    })
            })
    }

    // Get product detail
    getProductDetail = (req, res) => {
        let productSlug = req.params.product;
        Product.findOne({ slug: productSlug }, { _id: 0, __v: 0 })
            .then(product => {
                if (!product) { // Category not found
                    return res.status(404).json({ Error: "Product not found!" })
                }
                // Data
                let data = {
                    status: "ok",
                    message: null,
                    data: product
                }
                return res.status(200).send(data)
            })
            .catch(err => { // Error
                return res.status(500).send(err);
            })

    }

    // ==================== ADD ====================
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

    // ==================== UPDATE ====================
    // Update product
    updateProduct = async (req, res) => {
        let productID = req.body.productID;
        // Data for update
        let productInfo = {
            productName: req.body.productName,
            SKU: req.body.SKU,
            detail: req.body.detail,
            stock: req.body.stock,
            sold: req.body.sold,
            proce: req.body.proce,
            status: req.body.status,
            category: req.body.category,
            brand: req.body.brand,
            productImage: req.body.productImage
        };
        // Find one and update by product id
        Product.findOneAndUpdate({ productID: productID }, productInfo)
            .then((product) => {
                // Product not found
                if (!product) {
                    return res.status(404).json({ Error: "Product not found!" })
                }
                // Update successfully
                return res.status(200).json({
                    Result: "Update product successfully!",
                    productID: productID
                })
            })
            .catch(err => { return res.status(500).send(err) })
    }

    // Update Category
    updateCategory = async (req, res) => {
        let categoryID = req.body.categoryID;
        let categoryInfo = {
            categoryName: req.body.categoryName
        }
        // Update
        Category.findOneAndUpdate({ categoryID: categoryID }, categoryInfo)
            .then((category) => {
                if (!category) { // Category not found
                    return res.status(404).json({ Error: "Category not found!" })
                }
                // Update successfully
                return res.status(200).json({ Result: "Update category successfully!" })
            })
            .catch(err => { return res.status(500).send(err) })
    }

    // Update Brand
    updateBrand = async (req, res) => {
        let brandID = req.body.brandID;
        let brandInfo = {
            brandName: req.body.brandName
        }
        // Update
        Brand.findOneAndUpdate({ brandID: brandID }, brandInfo)
            .then((brand) => {
                if (!brand) { // Brand not found
                    return res.status(404).json({ Error: "Brand not found!" })
                }
                //
                return res.status(200).json({ Result: "Update brand successfully!" })
            })
            .catch(err => { return res.status(500).send(err) })

    }

    // ==================== DELETE ====================
    // Soft delete product
    softDeleteProduct = async (req, res) => {
        let productID = req.body.productID;
        let productInfo = {
            status: -1
        }
        // Update
        Product.findOneAndUpdate({ productID: productID }, productInfo)
            .then(product => {
                if (!product) { // Not found
                    return res.status(404).json({ Error: "Product not found!" })
                }
                if (product.status == -1) { // Deleted before
                    return res.status(204).json({
                        Error: "Product has been deleted before."
                    })
                }
                // Successfully
                return res.status(200).json({
                    Result: "Soft delete product successfully."
                })
            })
            .catch(err => { // Error
                return res.status(500).send(err);
            })
    }

    // Detele Category
    deleteCategory = async (req, res) => {
        let categoryID = req.body.categoryID;
        // Check product
        Product.find({ category: categoryID }, { _id: 0, __v: 0 })
            .then(products => {
                if (products.length > 0) {
                    return res.status(202).json({ Error: "Existing products with this category." })
                }
                // Delete category
                Category.findOneAndRemove({ categoryID: categoryID })
                    .then((category) => {
                        if (!category) {
                            return res.status(404).json({ Error: "Category not found!" })
                        }
                        return res.status(200).json({ Result: "Detete category successfully!" })
                    })
                    .catch(err => {
                        return res.status(500).send(err);
                    })
            })
            .catch(err => {
                return res.status(500).send(err);
            })
    }

    // Detele Brand
    deleteBrand = async (req, res) => {
        let brandID = req.body.brandID;
        // Check product
        Product.find({ brand: brandID }, { _id: 0, __v: 0 })
            .then(products => {
                if (products.length > 0) {
                    return res.status(202).json({ Error: "Existing products with this brand." })
                }
                // Delete brand
                Brand.findOneAndRemove({ brandID: brandID })
                    .then((brand) => {
                        if (!brand) {
                            return res.status(404).json({ Error: "Brand not found!" })
                        }
                        return res.status(200).json({ Result: "Detete brand successfully!" })
                    })
                    .catch(err => {
                        return res.status(500).send(err);
                    })
            })
            .catch(err => {
                return res.status(500).send(err);
            })
    }

    // ==================== CHECK ====================
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

}

export default new EmployeeController();