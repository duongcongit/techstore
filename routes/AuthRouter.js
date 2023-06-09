import express from 'express';
const router = express.Router();

import authController from '../controllers/AuthController.js';

// Admin
router.post('/login-admin', authController.loginAdmin)


export default router;