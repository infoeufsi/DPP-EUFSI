/**
 * EU ESPR Completeness Calculator
 * Calculates a score (0-100) based on required fields for a Digital Product Passport.
 */

export interface CompletenessResult {
    score: number;
    missingFields: string[];
    isCompliant: boolean;
}

export const calculateCompleteness = (dpp: any): CompletenessResult => {
    const requirements = [
        { label: 'Product GTIN', path: 'product.gtin' },
        { label: 'Batch/Lot Number', path: 'product.batch' },
        { label: 'Material Composition', path: 'materialComposition', minLength: 1 },
        { label: 'Supply Chain Journey', path: 'journey', minLength: 1 },
        { label: 'Recyclability Score', path: 'endOfLife.recyclability.recyclabilityScore' },
        { label: 'Recycling Process', path: 'endOfLife.recyclability.process' },
        { label: 'Collection Instructions', path: 'endOfLife.collectionScheme.instructions' }
    ];

    const missingFields: string[] = [];
    let points = 0;

    requirements.forEach(req => {
        const value = req.path.split('.').reduce((obj, key) => obj?.[key], dpp);

        let hasValue = !!value;
        if (req.minLength && Array.isArray(value)) {
            hasValue = value.length >= req.minLength;
        }

        if (hasValue) {
            points += 1;
        } else {
            missingFields.push(req.label);
        }
    });

    const score = Math.round((points / requirements.length) * 100);

    return {
        score,
        missingFields,
        isCompliant: score === 100
    };
};
