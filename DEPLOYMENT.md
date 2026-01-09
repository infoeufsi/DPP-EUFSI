# Deployment Guide - EUFSI DPP Tool

This guide covers the production deployment of the EUFSI Digital Product Passport tool.

## 🏗️ Architecture
- **Frontend**: Next.js (Vercel/Amis/Static hosting)
- **Backend**: Node.js/Express (Render/Heroku/Railway/AWS ECS)
- **Database**: PostgreSQL (Prisma)
- **Storage**: AWS S3 (for certificates and evidence)

## 🔑 Environment Variables
You must configure the following in your production environment:

### Backend (.env)
- `PORT`: e.g., 3001
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Long random string for session safety
- `FRONTEND_URL`: URL of the deployed frontend
- `AWS_ACCESS_KEY_ID`: AWS credentials for S3
- `AWS_SECRET_ACCESS_KEY`: AWS credentials for S3
- `AWS_REGION`: e.g., eu-central-1
- `AWS_S3_BUCKET_NAME`: e.g., eufsi-dpp-assets

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: URL of the deployed backend

## 🚀 Deployment Steps

### 1. Database Setup
Ensure your PostgreSQL instance is running and accessible.
```bash
cd backend
npx prisma migrate deploy
```

### 2. Backend Deployment
Deploy the `backend` folder.
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Frontend Deployment
Deploy the `frontend` folder.
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start` (or use static export if applicable)

## 🛡️ Security Hardening Includes
- **Helmet**: Secure HTTP headers
- **CORS**: Strict origin checking
- **Rate Limiting**: 100 requests per 15 min per IP
- **Audit Logging**: Traceability of all writes and logins
- **Zod**: Input validation for all DPP documents
