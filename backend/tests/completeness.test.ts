import { calculateCompleteness } from '../src/lib/completeness';

describe('Completeness Calculator', () => {
    it('should return 100% score for a complete DPP', () => {
        const completeDpp = {
            product: {
                gtin: '01234567890123',
                batch: 'LOT-001'
            },
            materialComposition: [
                { material: 'Cotton', percentage: 100 }
            ],
            journey: [
                { stage: 'Ginning', facility: { name: 'Eco Gin' } }
            ],
            endOfLife: {
                recyclability: {
                    recyclabilityScore: 8,
                    process: 'Mechanical'
                },
                collectionScheme: {
                    instructions: 'Return to store'
                }
            }
        };

        const result = calculateCompleteness(completeDpp);
        expect(result.score).toBe(100);
        expect(result.isCompliant).toBe(true);
        expect(result.missingFields).toHaveLength(0);
    });

    it('should return 0% score for an empty DPP', () => {
        const emptyDpp = {};
        const result = calculateCompleteness(emptyDpp);
        expect(result.score).toBe(0);
        expect(result.isCompliant).toBe(false);
        expect(result.missingFields.length).toBeGreaterThan(0);
    });

    it('should identify missing fields', () => {
        const partialDpp = {
            product: { gtin: '01234567890123' }
        };
        const result = calculateCompleteness(partialDpp);
        expect(result.missingFields).toContain('Batch/Lot Number');
        expect(result.missingFields).toContain('Material Composition');
    });
});
