# M Resin Art — Full-stack e-commerce starter

Production-oriented monorepo with three apps:

- `client` — public React storefront
- `admin` — separate React admin application
- `server` — Node/Express REST API + MongoDB/Mongoose

## 1. Requirements

Node.js 20+, MongoDB (local or Atlas), and a payment provider account when you are ready to accept advance payments.

## 2. Environment

Copy `server/.env.example` to `server/.env` and fill in MongoDB, cookie/session, and admin values. Never commit `.env`.

## 3. Install

```bash
npm install
npm run install:all
```

## 4. Seed products/admin

```bash
npm run seed
```

The seed creates 12 products and an admin account from environment variables.

## 5. Run

```bash
npm run dev
```

Storefront: http://localhost:5173
Admin: http://localhost:5174/admin/login
API: http://localhost:5000/api

## Payment

`server/src/services/paymentService.js` is a provider-neutral integration layer. It intentionally does not fake successful payments. Connect the merchant's real provider and webhook verification before going live.

## Deployment shape

Recommended: MongoDB Atlas + Render/Railway/Fly.io for API + Vercel/Netlify for `client` + a separate Vercel/Netlify project for `admin`. Configure the public site and admin site to point at the same API. Use HTTPS and a production cookie domain before launch.
