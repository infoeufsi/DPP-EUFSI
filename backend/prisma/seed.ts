import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // 1. Create Economic Operator
    const operator = await prisma.economicOperator.upsert({
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

    // 2. Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@eufsi.eu' },
        update: {},
        create: {
            email: 'admin@eufsi.eu',
            password: adminPassword,
            name: 'Global Admin',
            role: 'ADMIN',
            operatorId: operator.id
        }
    });

    // 3. Create Supplier User
    const supplierPassword = await bcrypt.hash('supplier123', 10);
    const supplier = await prisma.user.upsert({
        where: { email: 'supplier@weave.nl' },
        update: {},
        create: {
            email: 'supplier@weave.nl',
            password: supplierPassword,
            name: 'EcoWeave Manager',
            role: 'SUPPLIER',
            operatorId: operator.id
        }
    });

    console.log('✅ Seeding complete!');
    console.log('--- Credentials ---');
    console.log('Admin: admin@eufsi.eu / admin123');
    console.log('Supplier: supplier@weave.nl / supplier123');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
