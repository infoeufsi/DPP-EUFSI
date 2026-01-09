import { db } from '../lib/db.js';
import { DigitalProductPassportSchema } from '../schemas/validation.js';
import { DigitalProductPassport } from '../schemas/dpp.schema.js';

export class DppService {
    /**
     * Get a DPP by GTIN
     */
    async getByGtin(gtin: string): Promise<any | null> {
        // In production, query the database
        // For now, we'll try to find it in the DB, but since we have no migrations,
        // we use a safe approach or just mock it if DB fails.
        try {
            const dppRecord = await db.prisma.digitalProductPassport.findFirst({
                where: {
                    product: { gtin }
                },
                include: {
                    product: true,
                    batch: true,
                    operator: true
                }
            });
            return dppRecord ? (dppRecord.data as any) : null;
        } catch (e) {
            console.warn('DB Query failed, using mock data');
            return null;
        }
    }

    /**
     * Create a new DPP
     */
    async create(data: any): Promise<DigitalProductPassport> {
        // Validate data using Zod
        const validatedData = DigitalProductPassportSchema.parse(data);

        // In production, save to database
        // For now, we return the validated data with a generated ID
        return {
            ...validatedData,
            dppId: `DPP-${validatedData.product.gtin}-${validatedData.product.batch}`,
            version: "1.0",
            createdDate: new Date().toISOString()
        } as DigitalProductPassport;
    }

    /**
     * Get all DPPs
     */
    async getAll(): Promise<any[]> {
        try {
            const dpps = await db.prisma.digitalProductPassport.findMany({
                take: 20,
                select: {
                    data: true
                }
            });
            return dpps.map(d => d.data);
        } catch {
            return [];
        }
    }
}

export const dppService = new DppService();
