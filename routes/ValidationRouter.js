import express from 'express';
const router = express.Router();

import validationController from '../controllers/ValidationController.js';

router.post('/check-duplicate-username', validationController.checkDuplicateUsername)
router.post('/check-duplicate-email', validationController.checkDuplicateEmail)
router.post('/check-duplicate-phone', validationController.checkDuplicatePhoneNumber)

export default router;