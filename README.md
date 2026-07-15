# DMS — Document Management System

A full-stack document management web application built for financial professionals to store, organize, and access client documents in one place.

## Problem It Solves

Financial advisors, CAs, and insurance agents repeatedly ask clients for the same documents — Aadhaar, PAN, bank statements, and more. DMS eliminates this by providing a centralized portal where professionals can upload and access all client documents instantly.

## Live Demo

[Link after deployment]

## Features

- Email/password and Google OAuth authentication
- Each professional sees only their own clients and documents
- Add and manage multiple client profiles
- Upload documents per client (PDF, images) with metadata — name, type, and document number
- View documents directly in the browser
- Download documents locally
- Empty state handling and error feedback throughout
- Clean dark-themed UI built for professional use

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (Email + Google OAuth) |
| File Storage | Supabase Storage |
| Icons | Lucide React |

## Project Structure
src/
├── lib/
│   └── supabase.js              # Supabase client initialization
├── pages/
│   ├── LoginPage.jsx            # Login and signup with email/Google
│   ├── DashboardPage.jsx        # Client list with search
│   ├── AddClientPage.jsx        # Add new client form
│   ├── ClientPage.jsx           # Client profile and documents
│   └── UploadDocumentPage.jsx   # Document upload form
├── App.jsx                      # Route definitions
└── main.jsx                     # App entry point

## Database Schema

### members
| Column | Type | Description |
|---|---|---|
| id | int8 | Primary key |
| user_id | uuid | Links to authenticated user |
| name | text | Client full name |
| email | text | Client email |
| phone | text | Client phone number |
| age | int4 | Client age |
| created_at | timestamptz | Timestamp |

### documents
| Column | Type | Description |
|---|---|---|
| id | int8 | Primary key |
| member_id | int8 | Links to client |
| user_id | uuid | Links to authenticated user |
| doc_name | text | Document label |
| doc_type | text | Aadhaar / PAN / Driving License etc. |
| doc_number | text | Aadhaar number, PAN number etc. |
| file_url | text | Public URL from Supabase Storage |
| created_at | timestamptz | Timestamp |

## Getting Started

### Prerequisites
- Node.js v18+
- A Supabase account (free tier works)

### Setup

1. Clone the repository
```bash
   git clone https://github.com/anika-sachdev/dms-project.git
   cd dms-project/dms-frontend
```

2. Install dependencies
```bash
   npm install
```

3. Create a Supabase project at [supabase.com](https://supabase.com)

4. Create the following tables in Supabase Table Editor:
   - `members` with columns as listed above
   - `documents` with columns as listed above

5. Create a Storage bucket named `documents` with public access enabled

6. Enable Email and Google OAuth providers under Authentication → Providers

7. Create a `.env` file in the root directory:
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

8. Start the development server
```bash
   npm run dev
```

9. Open [http://localhost:5173](http://localhost:5173)

## Deployment

Frontend is deployed on Vercel. Connect your GitHub repository to Vercel, add the environment variables, and deploy.

After deployment, add your live URL to:
- Supabase → Authentication → URL Configuration → Redirect URLs
- Google Cloud Console → OAuth 2.0 → Authorized redirect URIs

## Author

**Anika Sachdev**  
B.Tech Computer Science and Engineering, VIT Vellore (2028)  
[GitHub](https://github.com/anika-sachdev) · [LinkedIn](https://www.linkedin.com/in/anika-sachdev-585607323/)
