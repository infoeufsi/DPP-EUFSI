import { Router } from 'express';
import { generateQr } from '../controllers/qr.controller.js';

const router = Router();

/**
 * QR Generation Routes
 * Base path: /api/v1/qr
 */

// Generate a QR code for a GTIN
// GET /api/v1/qr/generate/:gtin?batch=LOT-123
router.get('/generate/:gtin', generateQr);

export default router;
