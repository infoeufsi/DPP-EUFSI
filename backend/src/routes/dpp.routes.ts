import { Router } from 'express';
import { getDpp, createDpp, getAllDpps } from '../controllers/dpp.controller.js';

const router = Router();

/**
 * DPP Routes
 * Base path: /api/v1/dpp
 */

// Get all DPPs (with pagination)
router.get('/', getAllDpps);

// Get a single DPP by ID
router.get('/:id', getDpp);

// Create a new DPP
router.post('/', createDpp);

export default router;
