import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Admin Routes
 * Base path: /api/v1/admin
 */

// All routes here require ADMIN role
router.use(protect);
router.use(authorize('ADMIN'));

router.get('/stats', adminController.getStats);
router.get('/suppliers', adminController.getSuppliers);
router.get('/reports/export', adminController.exportReports);

export default router;
