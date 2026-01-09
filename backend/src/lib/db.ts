import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

/**
 * DB Service
 * Provides a managed Prisma instance and helper methods
 */
class DbService {
  public prisma: PrismaClient;
  private isConnected: boolean = false;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async connect() {
    if (this.isConnected) return;
    
    try {
      await this.prisma.$connect();
      this.isConnected = true;
      console.log('✅ Database connected');
    } catch (error) {
      console.error('❌ Database connection failed:', (error as Error).message);
      console.warn('⚠️ Service will operate in degraded/mock mode if needed');
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
    this.isConnected = false;
  }
}

export const db = new DbService();
export default db;
