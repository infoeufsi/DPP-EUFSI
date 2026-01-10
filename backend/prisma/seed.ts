import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database with realistic use case...');

    // 1. Create Main Economic Operator (EU Brand)
    const brandOperator = await prisma.economicOperator.upsert({
        where: { vatId: 'NL876543210B01' },
        update: {},
        create: {
            legalName: 'EUFSI Textile Solutions',
            vatId: 'NL876543210B01',
            streetAddress: 'Sustainable Way 42',
            city: 'Amsterdam',
            country: 'NL',
            email: 'contact@eufsi-test.com',
            phone: '+31 20 123 4567'
        }
    });

    // 2. Create Manufacturing Operator (India Factory)
    const indiaOperator = await prisma.economicOperator.upsert({
        where: { vatId: 'IN9988776655' },
        update: {},
        create: {
            legalName: 'Indo-Cotton Mills Ltd.',
            vatId: 'IN9988776655',
            streetAddress: 'Industrial Zone 7, Tirupur',
            city: 'Tamil Nadu',
            country: 'IN',
            email: 'production@indocotton.in',
            phone: '+91 421 987 6543'
        }
    });

    // 3. Create Admin & Supplier Users
    const adminPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.upsert({
        where: { email: 'admin@eufsi.eu' },
        update: {},
        create: {
            email: 'admin@eufsi.eu',
            password: adminPassword,
            name: 'Global Admin',
            role: 'ADMIN',
            operatorId: brandOperator.id
        }
    });

    const supplierPassword = await bcrypt.hash('supplier123', 10);
    await prisma.user.upsert({
        where: { email: 'supplier@weave.nl' },
        update: {},
        create: {
            email: 'supplier@weave.nl',
            password: supplierPassword,
            name: 'EcoWeave Manager',
            role: 'SUPPLIER',
            operatorId: brandOperator.id
        }
    });

    // 4. Create Product: Premium Organic Cotton T-Shirt
    const product = await prisma.product.upsert({
        where: { gtin: '08712345678901' },
        update: {},
        create: {
            gtin: '08712345678901',
            sku: 'TSH-ORG-COT-BLU-M',
            name: 'Premium Organic Cotton T-Shirt',
            description: 'Environmentally friendly, 100% organic cotton t-shirt. Breathable, durable, and fully traceable from field to closet.',
            brand: 'EUFSI Essentials',
            category: 'Apparel > Tops > T-Shirts',
            size: 'M',
            color: 'Deep Ocean Blue',
            image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800'
        }
    });

    // 5. Create Batch
    const batch = await prisma.batch.upsert({
        where: {
            productId_lotNumber: {
                productId: product.id,
                lotNumber: 'BATCH-2024-IN-001'
            }
        },
        update: {},
        create: {
            productId: product.id,
            lotNumber: 'BATCH-2024-IN-001',
            productionDate: new Date('2024-01-15'),
        }
    });

    // 6. Create Digital Product Passport (DPP)
    const dppData = {
        "@context": ["https://schema.org/", "https://w3id.org/dpp"],
        "type": "DigitalProductPassport",
        "productName": "Premium Organic Cotton T-Shirt",
        "gtin": "08712345678901",
        "batchNumber": "BATCH-2024-IN-001",
        "manufacturer": {
            "name": "Indo-Cotton Mills Ltd.",
            "location": "Tirupur, India",
            "certification": "GOTS Certified"
        },
        "sustainability": {
            "materialComposition": [
                { "material": "Organic Cotton", "percentage": 100, "origin": "India" }
            ],
            "carbonFootprint": "2.4 kg CO2e",
            "waterUsage": "150 liters",
            "circularity": {
                "recyclability": "High",
                "recommendedDisposal": "Textile recycling bin",
                "repairability": "Ease of repair: 8/10"
            }
        },
        "supplyChain": [
            { "stage": "Farming", "location": "Gujarat, India", "actor": "Maharashtra Cotton Co-op" },
            { "stage": "Spinning", "location": "Coimbatore, India", "actor": "Indo-Cotton Mills" },
            { "stage": "Dyeing", "location": "Tirupur, India", "actor": "EcoDye India Ltd" },
            { "stage": "Assembly", "location": "Tirupur, India", "actor": "Indo-Cotton Mills" }
        ],
        "compliance": {
            "espr": "Compliant",
            "reach": "Compliant",
            "oeKO_TEX": "Standard 100 Verified"
        }
    };

    await prisma.digitalProductPassport.upsert({
        where: { dppId: 'DPP-08712345678901-2024IN001' },
        update: {},
        create: {
            dppId: 'DPP-08712345678901-2024IN001',
            version: '1.0',
            data: dppData,
            productId: product.id,
            batchId: batch.id,
            operatorId: indiaOperator.id,
            accessControl: { public: true, supplier: true, admin: true }
        }
    });

    console.log('✅ Seeding complete!');
    console.log('--- Credentials ---');
    console.log('Admin: admin@eufsi.eu / admin123');
    console.log('Supplier: supplier@weave.nl / supplier123');
    console.log('--- Sample Data ---');
    console.log('Product GTIN: 08712345678901');
    console.log('Batch: BATCH-2024-IN-001');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
