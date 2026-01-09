import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Auth Routes
 * Base path: /api/v1/auth
 */

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);

export default router;
