import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler.js';
import { dppService } from '../services/dpp.service.js';
import { auditService } from '../lib/audit.js';

/**
 * Get all DPPs (with pagination)
 * GET /api/v1/dpp
 */
export const getAllDpps = asyncHandler(async (req: Request, res: Response) => {
    const dpps = await dppService.getAll();

    res.json({
        data: dpps,
        count: dpps.length,
        page: 1,
        totalPages: 1
    });
});

/**
 * Get a single DPP by ID (GTIN)
 * GET /api/v1/dpp/:id
 */
export const getDpp = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { view = 'public' } = req.query;

    const dpp = await dppService.getByGtin(id);

    if (!dpp) {
        res.status(404);
        throw new Error(`DPP not found for GTIN: ${id}`);
    }

    // Filter fields based on access tier
    let filteredDpp = dpp;

    if (view === 'public') {
        // B2C view - only public fields
        filteredDpp = {
            dppId: dpp.dppId,
            product: dpp.product,
            materialComposition: (dpp.materialComposition || []).map((m: any) => ({
                material: m.material,
                percentage: m.percentage,
                certifications: m.certifications,
                origin: { country: m.origin?.country }
            })),
            journey: (dpp.journey || []).map((j: any) => ({
                stage: j.stage,
                facility: {
                    name: j.facility?.name,
                    location: { country: j.facility?.location?.country }
                },
                process: { type: j.process?.type }
            })),
            usePhase: dpp.usePhase,
            endOfLife: dpp.endOfLife,
            sustainability: dpp.sustainability,
            compliance: dpp.compliance
        };
    }

    res.json({
        data: filteredDpp,
        accessTier: view
    });
});

/**
 * Create a new DPP
 * POST /api/v1/dpp
 */
export const createDpp = asyncHandler(async (req: Request, res: Response) => {
    const dpp = await dppService.create(req.body);

    await auditService.log({
        action: 'DPP_CREATE',
        resourceType: 'DigitalProductPassport',
        resourceId: dpp.dppId,
        userId: (req as any).user?.id,
        data: { gtin: dpp.product.gtin, batch: dpp.product.batch }
    });

    res.status(201).json({
        message: 'DPP created successfully',
        data: dpp
    });
});
