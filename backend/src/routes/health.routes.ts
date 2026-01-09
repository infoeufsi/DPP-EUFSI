import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Health Check Endpoint
 * GET /api/health
 */
router.get('/', (req: Request, res: Response) => {
    res.json({
        status: 'healthy',
        service: 'EUFSI DPP Tool API',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

/**
 * Readiness Check (for Kubernetes/Render)
 * GET /api/health/ready
 */
router.get('/ready', (req: Request, res: Response) => {
    // Add database connectivity check here in production
    res.json({
        status: 'ready',
        checks: {
            database: 'ok', // TODO: Add real DB check
            storage: 'ok'   // TODO: Add S3 check
        }
    });
});

export default router;
