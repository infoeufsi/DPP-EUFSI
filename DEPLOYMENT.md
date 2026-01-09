# Deployment Guide - EUFSI DPP Tool (Unified Render Strategy)

This guide covers the production deployment of the EUFSI Digital Product Passport tool using **Render Blueprint**, which automates the setup of the entire stack.

## 🏗️ Architecture
- **Infrastructure Provider**: Render (Unified Platform)
- **Frontend**: Next.js (Web Service)
- **Backend**: Node.js/Express (Web Service)
- **Database**: PostgreSQL (Managed Instance)
- **Storage**: AWS S3 (for certificates and evidence)

## � One-Click Deployment (Recommended)

1.  Push your code to GitHub.
2.  Log in to [Render](https://dashboard.render.com).
3.  Click **"New +"** and select **"Blueprint"**.
4.  Connect your repository. Render will automatically detect `render.yaml`.
5.  Click **"Apply"**.

Render will automatically provision the PostgreSQL database, the Backend API, and the Frontend service, linking them together securely.

## 🔑 Manual Configuration (If not using Blueprints)

### Backend Service
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`
- **Required Env**: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`

### Frontend Service
- **Build Command**: `cd frontend && npm install && npm run build`
- **Start Command**: `cd frontend && npm start`
- **Required Env**: `NEXT_PUBLIC_API_URL` (Point to your Backend URL)

### Database
- **Type**: PostgreSQL
- **Steps**: Create a new PostgreSQL instance on Render and copy the **Internal Database URL** to the Backend's `DATABASE_URL` env variable.

## 🛡️ Security & Performance
- **Private Networking**: By using Render for both, the Frontend and Backend communicate over Render's private network for increased speed and security.
- **Auto-scaling**: Both services can be scaled horizontally if traffic increases.
- **Audit Trails**: All system mutations are logged to the PostgreSQL database for regulatory compliance.

## 📦 Post-Deployment
Once deployed, run migrations to ensure your production database is up to date:
```bash
cd backend
npx prisma migrate deploy
```
