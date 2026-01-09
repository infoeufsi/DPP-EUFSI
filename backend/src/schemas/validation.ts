import { z } from 'zod';

export const ProductIdentitySchema = z.object({
    gtin: z.string().regex(/^\d{13,14}$/, 'Invalid GTIN format'),
    sku: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    brand: z.string().min(1),
    category: z.string().min(1),
    size: z.string().optional(),
    color: z.string().optional(),
    batch: z.string().min(1),
    productionDate: z.string().optional(),
    image: z.string().url().optional(),
});

export const EconomicOperatorSchema = z.object({
    legalName: z.string().min(1),
    vatId: z.string().min(1),
    address: z.object({
        streetAddress: z.string().min(1),
        addressLocality: z.string().min(1),
        addressCountry: z.string().length(2),
    }),
    contactPoint: z.object({
        email: z.string().email(),
        telephone: z.string().min(1),
    }),
});

export const MaterialCompositionSchema = z.object({
    material: z.string().min(1),
    materialType: z.string().min(1),
    percentage: z.number().min(0).max(100),
    certifications: z.array(z.string()),
    origin: z.object({
        country: z.string().length(2),
        region: z.string().min(1),
        supplier: z.string().optional(),
    }),
    recycledContent: z.number().min(0).max(100).optional(),
});

export const SupplyChainEventSchema = z.object({
    stage: z.string().min(1),
    tier: z.number().int().min(1),
    facility: z.object({
        name: z.string().min(1),
        id: z.string().optional(),
        location: z.object({
            country: z.string().length(2),
            region: z.string().optional(),
            city: z.string().optional(),
            coordinates: z.object({
                lat: z.number(),
                lon: z.number(),
            }).optional(),
        }),
    }),
    process: z.object({
        type: z.enum(['agriculture', 'spinning', 'weaving', 'knitting', 'dyeing', 'finishing', 'assembly', 'transport']),
        description: z.string().optional(),
        startDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
        endDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
    }),
    input: z.object({
        material: z.string(),
        quantity: z.number(),
        unit: z.string(),
        sourceBatch: z.string().optional(),
    }).optional(),
    output: z.object({
        material: z.string().optional(),
        product: z.string().optional(),
        quantity: z.number(),
        unit: z.string(),
    }),
    certifications: z.array(z.object({
        type: z.string(),
        certificateNumber: z.string(),
        validUntil: z.string(),
        document: z.string().url(),
    })).optional(),
});

export const DigitalProductPassportSchema = z.object({
    product: ProductIdentitySchema,
    economicOperator: EconomicOperatorSchema,
    materialComposition: z.array(MaterialCompositionSchema).min(1),
    journey: z.array(SupplyChainEventSchema).min(1),
    environmentalFootprint: z.object({
        methodology: z.string(),
        impactCategories: z.array(z.object({
            indicator: z.string(),
            value: z.number(),
            unit: z.string(),
            contributionByStage: z.record(z.number()).optional(),
        })),
    }).optional(),
    durabilityRepairability: z.object({
        expectedLifespan: z.object({
            value: z.number(),
            unit: z.string(),
        }).optional(),
        durabilityScore: z.number().min(0).max(10).optional(),
        repairabilityIndex: z.number().min(0).max(10).optional(),
        repairGuide: z.string().url().optional(),
    }).optional(),
    usePhase: z.object({
        careInstructions: z.array(z.object({
            icon: z.string(),
            description: z.string(),
        })),
    }),
    endOfLife: z.object({
        recyclability: z.object({
            recyclable: z.boolean(),
            recyclabilityScore: z.number().min(0).max(10).optional(),
            process: z.string(),
        }),
        collectionScheme: z.object({
            available: z.boolean(),
            instructions: z.string(),
        }),
    }),
});
