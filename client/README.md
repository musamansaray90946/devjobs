# DevJobs — Full-Stack Job Board

A modern job board platform built with React, Node.js, PostgreSQL & Prisma.

**Live:** [https://devjobs-umber.vercel.app](https://devjobs-umber.vercel.app)

## Features

- Browse and search jobs by title, location, and type
- User authentication with JWT (Job Seeker, Employer, Admin roles)
- Job seekers can apply with cover letters and track application status
- Employers can post jobs, view applicants, and manage application status
- Admin panel for managing all job listings
- Fully responsive design with mobile hamburger menu
- Production deployed with Vercel, Render, and Neon PostgreSQL

## Tech Stack

**Frontend:** React 19, React Router, Tailwind CSS 4, Vite, Axios

**Backend:** Node.js, Express, Prisma ORM, PostgreSQL, JWT, bcrypt

**Deployment:** Vercel (frontend), Render (backend), Neon (database)

## Getting Started
```bash
# Clone
git clone https://github.com/musamansaray90946/devjobs.git

# Backend
cd server
npm install
cp .env.example .env  # Add your DATABASE_URL and JWT_SECRET
npx prisma migrate dev
node src/seed.js
npm run dev

# Frontend
cd ../client
npm install
npm run dev
```

## Test Accounts

- **Employer:** employer@techcorp.com / password123
- **Admin:** admin@devjobs.com / password123

## Author

**Musa Mansaray** — Full-Stack Developer

- GitHub: [musamansaray90946](https://github.com/musamansaray90946)
- Portfolio: [musamansaray90946.github.io](https://musamansaray90946.github.io)