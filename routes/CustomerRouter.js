import express from 'express';
const router = express.Router();

import AuthMiddleWare from '../middleware/AuthMiddleware.js';
import CustomerController from '../controllers/CustomerController.js';

router.use(AuthMiddleWare.isAuth)
router.use(AuthMiddleWare.isCustomerAuth)
//
router.get('/get-profile', CustomerController.getProfile)
router.get('/get-cart-detail', CustomerController.getCartDetail)
router.get('/get-reicept-detail/:receiptID', CustomerController.getReceiptDetail)

router.post('/add-to-cart', CustomerController.addOrUpdateCart)
router.post('/order', CustomerController.order)

router.post('/update-profile', CustomerController.updateProfile)
router.post('/change-password', CustomerController.changePassword)
router.post('/update-cart', CustomerController.addOrUpdateCart)

router.delete('/delete-from-cart', CustomerController.deleteFromCart)


export default router;