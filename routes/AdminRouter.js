import express from 'express';
const router = express.Router();

import AuthMiddleWare from '../middleware/AuthMiddleware.js';
import authController from '../controllers/AuthController.js';
import AdminController from '../controllers/AdminController.js';

router.post('/refresh-token-for-admin', authController.resfreshTokenForAdmin)

router.use(AuthMiddleWare.isAdminAuth)


// Manage Admin
router.get('/get-all-admins', AdminController.getAllAdmins)
router.get('/get-admin-info/:adminUsername', AdminController.getAdminInfo)
router.post('/add-admin', AdminController.addAdmin)
router.post('/update-admin', AdminController.updateAdmin)
router.post('/soft-delete-admin', AdminController.softDeleteAdmin)
router.delete('/delete-admin', AdminController.deleteAdmin)

// Manage Employee
router.get('/get-all-employees', AdminController.getAllEmployees)
router.get('/get-employee-info/:employeeUsername', AdminController.getEmployeeInfo)
router.post('/add-employee', AdminController.addEmployee)
router.post('/update-employee', AdminController.updateEmployee)
router.post('/soft-delete-employee', AdminController.softDeleteEmployee)
router.delete('/delete-employee', AdminController.deleteEmployee)


// Manage Customer
router.get('/get-all-customers', AdminController.getAllCustomers)
router.get('/get-customer-info/:customerUsername', AdminController.getCustomerInfo)
router.post('/update-customer', AdminController.updateCustomer)
router.post('/soft-delete-customer', AdminController.softDeleteCustomer)
router.delete('/delete-customer', AdminController.deleteCustomer)

export default router;