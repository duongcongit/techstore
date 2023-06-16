import express, { response } from 'express';
import { request } from 'http';
const router = express.Router();

import AuthMiddleWare from '../middleware/AuthMiddleware.js';
import EmployeeController from '../controllers/EmployeeController.js';

router.use(AuthMiddleWare.isAuth)
router.use(AuthMiddleWare.isEmployeeAuth)

//
router.get('/get-all-products', EmployeeController.getAllProducts)
router.get('/get-products-available', EmployeeController.getProductsAvailable)
router.get('/get-products-by-category/:category', EmployeeController.getProductsByCategory)

router.post('/add-product', EmployeeController.addProduct)
router.post('/add-category', EmployeeController.addCategory)
router.post('/add-brand', EmployeeController.addBrand)
router.post('/edit-category', EmployeeController.editCategory)
router.post('/edit-brand', EmployeeController.editBrand)
router.delete('/delete-category', EmployeeController.deleteCategory)
router.delete('/delete-brand', EmployeeController.deleteBrand)


export default router;