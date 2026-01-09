import { db } from './db.js';

/**
 * EU ESPR Audit Logging Service
 * Records system actions for regulatory compliance and security.
 */
export class AuditService {
    /**
     * Log an action to the database
     */
    async log(params: {
        action: string;
        resourceType: string;
        resourceId: string;
        userId?: string;
        data?: any;
    }) {
        try {
            console.log(`[Audit] ${params.action} on ${params.resourceType}:${params.resourceId}`);

            await db.prisma.auditLog.create({
                data: {
                    action: params.action,
                    resourceType: params.resourceType,
                    resourceId: params.resourceId,
                    userId: params.userId,
                    data: params.data ? (params.data as any) : undefined
                }
            });
        } catch (error) {
            console.error('Audit Logging failed:', error);
        }
    }
}

export const auditService = new AuditService();
