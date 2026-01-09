import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import healthRoutes from './routes/health.routes.js';
import dppRoutes from './routes/dpp.routes.js';
import resolverRoutes from './routes/resolver.routes.js';
import qrRoutes from './routes/qr.routes.js';
import authRoutes from './routes/auth.routes.js';

// Import database
import { db } from './lib/db.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/v1/dpp', dppRoutes);
app.use('/api/v1/qr', qrRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/resolve', resolverRoutes);

// Error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  await db.connect();

  app.listen(PORT, () => {
    console.log(`
  🚀 EUFSI DPP Tool API Server
  ============================
  Environment: ${process.env.NODE_ENV || 'development'}
  Port: ${PORT}
  Health: http://localhost:${PORT}/api/health
  API: http://localhost:${PORT}/api/v1/dpp
  Resolver: http://localhost:${PORT}/resolve/{gtin}
  `);
  });
};

startServer();

export default app;
