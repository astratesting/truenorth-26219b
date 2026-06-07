# TrueNorth

A conversion-focused landing page product that moves founders from rough idea to a credible first launch with a public surface, operating plan, and outreach-ready assets.

## Features

- **Landing Page**: Responsive, conversion-focused design with hero section, value propositions, social proof, and waitlist capture
- **Waitlist API**: Express.js backend with in-memory storage for lead capture
- **Health Check**: `/api/health` endpoint for monitoring
- **Validation**: Client-side and server-side form validation
- **Deployment Ready**: Docker, Netlify, Vercel configs included

## Quick Start

### Prerequisites
- Node.js 20+
- npm

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000` with API proxy to backend.

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs at `http://localhost:4000`.

### Run Tests

```bash
# Frontend tests
cd frontend && npm run test

# Backend tests
cd backend && npm run test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/waitlist` | Submit waitlist lead |
| GET | `/api/waitlist` | List all leads (dev only) |

### Waitlist Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Optional Co.",
  "idea": "Optional description"
}
```

## Deployment

### Docker

```bash
docker-compose up --build
```

### Netlify

1. Connect repo to Netlify
2. Build command: `cd frontend && npm ci && npm run build`
3. Publish directory: `frontend/dist`
4. Add redirect for `/api/*` to your backend URL

### Vercel

1. Connect repo to Vercel
2. `vercel.json` is pre-configured for both frontend and backend

## Project Structure

```
truenorth/
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/   # Navigation, Hero, ValueProps, etc.
│   │   ├── tests/        # Vitest + RTL tests
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── app/page.tsx     # Landing page container
│   └── package.json
├── backend/           # Express.js API
│   ├── tests/            # Jest + Supertest tests
│   ├── main.js           # Server entry point
│   └── package.json
├── docker-compose.yml
├── netlify.toml
├── vercel.json
└── README.md
```

## KPIs

- Required launch artifacts ready: 14+
- Public launch surface: deployable

## License

MIT
