import express from 'express';
const router = express.Router();

import authController from '../controllers/AuthController.js';
import ValidMiddelware from '../middleware/ValidMiddelware.js';

// 
router.post('/login', authController.login)

router.use(ValidMiddelware.checkDuplicateUsername);
router.use(ValidMiddelware.checkDuplicateEmail);
router.use(ValidMiddelware.checkDuplicatePhoneNumber);

router.post('/register', authController.register)


export default router;