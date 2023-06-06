import express from 'express';
const router = express.Router();
import AdminController from '../controllers/AdminController.js';

// Manage Admin
router.get('/get-all-admins', AdminController.getAllAdmins)


export default router;