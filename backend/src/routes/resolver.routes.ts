import { Router } from 'express';
import { resolveDpp } from '../controllers/resolver.controller.js';

const router = Router();

/**
 * QR Code Resolver Routes
 * Base path: /resolve
 * 
 * This handles GS1 Digital Link resolution
 * When a user scans a QR code, it redirects to the consumer view
 */

// Resolve GTIN to DPP page
// Example: /resolve/01234567890123?batch=LOT-001
router.get('/:gtin', resolveDpp);

export default router;
