# EUFSI DPP Tool

**Digital Product Passport for EU Textile Industry**

A comprehensive Digital Product Passport (DPP) system designed to meet EU ESPR requirements for textiles, enabling full supply chain traceability from raw materials to end-of-life.

## 🎯 Purpose

- Meet EU ESPR DPP requirements for textiles (2027-2028)
- Enable supply chain traceability (cotton farm → EU retail)
- Provide tiered transparency (B2C, B2B, B2G)
- Support circular economy (repair, resale, recycling)

## 🛠️ Tech Stack

- **Frontend**: React + Next.js
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Supabase)
- **File Storage**: AWS S3
- **Authentication**: Auth0
- **Standards**: GS1 Digital Link, JSON-LD, EPCIS

## 📋 Features (MVP)

- [ ] QR Code Resolver (scan → DPP page)
- [ ] Consumer View (product journey, materials, care instructions)
- [ ] Supplier Portal (batch data upload)
- [ ] Admin Console (dashboards, analytics)
- [ ] Tiered Access Control (public, B2B, B2G)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Run development server
npm run dev
```

## 📁 Project Structure

```
eufsi-dpp-tool/
├── backend/          # Express API server
├── frontend/         # Next.js application
├── prisma/           # Database schema
├── docs/             # Documentation
└── tests/            # Test suites
```

## 📖 Documentation

See `DPP PRD.txt` for full Product Requirements Document.

## 📄 License

Proprietary - bAwear / EU FSI

## 🤝 Contributing

Internal development only.
