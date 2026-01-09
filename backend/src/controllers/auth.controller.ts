import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../lib/db.js';
import { auditService } from '../lib/audit.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

export class AuthController {
    /**
     * Register a new User (Supplier)
     */
    register = asyncHandler(async (req: Request, res: Response) => {
        const { email, password, name, operatorId } = req.body;

        // Check if user exists
        const existingUser = await db.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await db.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                operatorId,
                role: 'SUPPLIER'
            }
        });

        // Generate token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        await auditService.log({
            action: 'USER_REGISTER',
            resourceType: 'User',
            resourceId: user.id,
            userId: user.id,
            data: { email: user.email }
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token
        });
    });

    /**
     * Login User
     */
    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Find user
        const user = await db.prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401);
            throw new Error('Invalid email or password');
        }

        // Generate token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        await auditService.log({
            action: 'USER_LOGIN',
            resourceType: 'User',
            resourceId: user.id,
            userId: user.id
        });

        res.json({
            message: 'Login successful',
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
            token
        });
    });

    /**
     * Get current user info (Me)
     */
    getMe = asyncHandler(async (req: any, res: Response) => {
        const user = await db.prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, role: true, operatorId: true }
        });

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        res.json({ data: user });
    });
}

export const authController = new AuthController();
