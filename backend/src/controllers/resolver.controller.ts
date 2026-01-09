import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * QR Code Resolver
 * Resolves a GTIN to the appropriate DPP view
 * 
 * GET /resolve/:gtin?batch=:batch
 */
export const resolveDpp = asyncHandler(async (req: Request, res: Response) => {
    const { gtin } = req.params;
    const { batch } = req.query;

    // Validate GTIN format (13 or 14 digits)
    if (!/^\d{13,14}$/.test(gtin)) {
        res.status(400);
        throw new Error('Invalid GTIN format. Must be 13 or 14 digits.');
    }

    // Build the DPP URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    let dppUrl = `${frontendUrl}/dpp/${gtin}`;

    if (batch) {
        dppUrl += `?batch=${batch}`;
    }

    // Log the resolution for analytics
    console.log(`[Resolver] GTIN: ${gtin}, Batch: ${batch || 'N/A'} → ${dppUrl}`);

    // Check User-Agent to determine response type
    const userAgent = req.get('User-Agent') || '';
    const isApiCall = req.get('Accept')?.includes('application/json');

    if (isApiCall) {
        // API call - return JSON
        res.json({
            gtin,
            batch: batch || null,
            dppUrl,
            resolvedAt: new Date().toISOString()
        });
    } else {
        // Browser/QR scan - redirect to frontend
        res.redirect(302, dppUrl);
    }
});
