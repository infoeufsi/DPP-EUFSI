import { Request, Response, NextFunction } from 'express';

/**
 * Request logging middleware
 * Logs incoming requests for debugging and monitoring
 */
export function requestLogger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const start = Date.now();

    // Log request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);

    // Log response when finished
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`
        );
    });

    next();
}
