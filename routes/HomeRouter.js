import express from 'express';
const router = express.Router();

import homeController from '../controllers/HomeController.js';

// 
router.get('/get-all-products', homeController.getAllProducts)
router.get('/get-products-available', homeController.getProductsAvailable)
router.get('/get-products-by-category/:category', homeController.getProductsByCategory)
router.get('/get-product-detail/:product', homeController.getProductDetail)

export default router;