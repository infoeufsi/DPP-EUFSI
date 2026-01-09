/**
 * EUFSI DPP Tool - Core Data Model
 * Based on JSON-LD, GS1, and CIRPASS standards
 */

export interface ProductIdentity {
    gtin: string;
    sku: string;
    name: string;
    description: string;
    brand: string;
    category: string;
    size?: string;
    color?: string;
    batch: string;
    productionDate?: string;
    image?: string;
}

export interface EconomicOperator {
    legalName: string;
    vatId: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressCountry: string;
    };
    contactPoint: {
        email: string;
        telephone: string;
    };
}

export interface MaterialComposition {
    material: string;
    materialType: string;
    percentage: number;
    certifications: string[];
    origin: {
        country: string;
        region: string;
        supplier?: string;
    };
    recycledContent?: number;
}

export interface SupplyChainEvent {
    stage: string;
    tier: number;
    facility: {
        name: string;
        id?: string;
        location: {
            country: string;
            region?: string;
            city?: string;
            coordinates?: {
                lat: number;
                lon: number;
            };
        };
    };
    process: {
        type: 'agriculture' | 'spinning' | 'weaving' | 'knitting' | 'dyeing' | 'finishing' | 'assembly' | 'transport';
        description?: string;
        startDate: string;
        endDate: string;
    };
    input?: {
        material: string;
        quantity: number;
        unit: string;
        sourceBatch?: string;
    };
    output: {
        material?: string;
        product?: string;
        quantity: number;
        unit: string;
    };
    certifications?: Array<{
        type: string;
        certificateNumber: string;
        validUntil: string;
        document: string;
    }>;
}

export interface EnvironmentalFootprint {
    methodology: string;
    impactCategories: Array<{
        indicator: string;
        value: number;
        unit: string;
        contributionByStage?: Record<string, number>;
    }>;
}

export interface DurabilityRepairability {
    expectedLifespan?: {
        value: number;
        unit: string;
    };
    durabilityScore?: number;
    repairabilityIndex?: number;
    repairGuide?: string;
}

export interface UsePhase {
    careInstructions: Array<{
        icon: string;
        description: string;
    }>;
}

export interface EndOfLife {
    recyclability: {
        recyclable: boolean;
        recyclabilityScore?: number;
        process: string;
    };
    collectionScheme: {
        available: boolean;
        instructions: string;
    };
}

export interface DigitalProductPassport {
    dppId: string;
    version: string;
    createdDate: string;
    lastModified?: string;
    product: ProductIdentity;
    economicOperator: EconomicOperator;
    materialComposition: MaterialComposition[];
    journey: SupplyChainEvent[];
    environmentalFootprint?: EnvironmentalFootprint;
    durabilityRepairability?: DurabilityRepairability;
    usePhase: UsePhase;
    endOfLife: EndOfLife;
}
