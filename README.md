# IELTS LMS

An AI-assisted Learning Management System built to help students prepare for the IELTS exam, covering all four core skills — Listening, Reading, Writing, and Speaking — alongside vocabulary building, personalized study planning, full-length mock tests, and progress tracking.

**Live demo:** [lms-ielts-t3zj.vercel.app](https://lms-ielts-t3zj.vercel.app)

---

## Overview

IELTS LMS is a full-stack learning platform designed around eight core modules that mirror how students actually prepare for the exam — from skill-specific practice to a personalized study plan and full mock exams. The platform is built on Next.js (App Router) with a PostgreSQL database via Prisma, authentication via Clerk, video delivery via Mux, and payments via Stripe, making it a production-oriented LMS rather than a static practice site.

## Features

- **Student Dashboard** — A centralized view for students to track enrolled courses, progress, and activity
- **Course Analytics** — Insights and analytics for tracking course performance and student engagement
- **Course Upload** — Instructors/admins can create and upload courses, including video and supporting materials
- **Purchasing via Stripe** — Secure course purchases and payment handling through Stripe integration

## Tech Stack

**Framework & Language**
- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)

**Database & ORM**
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/) with `@prisma/adapter-pg`

**Auth, Media & Payments**
- [Clerk](https://clerk.com/) — authentication
- [Mux](https://www.mux.com/) — video hosting & playback
- [Stripe](https://stripe.com/) — payments
- [UploadThing](https://uploadthing.com/) — file uploads

**UI & Styling**
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) — icons
- [Recharts](https://recharts.org/) — dashboard charts
- [React Quill New](https://github.com/vishnu2kmohan/react-quill-new) — rich text editor
- [Embla Carousel](https://www.embla-carousel.com/) — carousels
- [React Confetti](https://www.npmjs.com/package/react-confetti) — celebratory UI feedback

**State, Forms & Utilities**
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — forms & validation
- [TanStack Table](https://tanstack.com/table) — data tables
- [date-fns](https://date-fns.org/) — date utilities
- [Axios](https://axios-http.com/) — HTTP client

## Project Structure

```
lms_ielts/
├── actions/        # Server actions
├── app/            # Next.js App Router pages, layouts & routes
├── components/     # Reusable React components
├── hooks/          # Custom React hooks
├── lib/            # Shared utilities, config & helpers
├── prisma/         # Prisma schema & migrations
├── public/         # Static assets
├── scripts/        # Utility/maintenance scripts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A PostgreSQL database
- Accounts/API keys for Clerk, Mux, Stripe, and UploadThing (for full functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Riddhi73/lms_ielts.git
   cd lms_ielts
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root with the following:
   ```env
   # Database
   DATABASE_URL=

   # Clerk Auth
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # Mux (video)
   MUX_TOKEN_ID=
   MUX_TOKEN_SECRET=

   # Stripe (payments)
   STRIPE_API_KEY=
   STRIPE_WEBHOOK_SECRET=

   # UploadThing
   UPLOADTHING_TOKEN=
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run linting checks |

## Deployment

This project is deployed on [Vercel](https://vercel.com/), the platform built by the creators of Next.js. Any push to the main branch can be configured to trigger an automatic deployment.

## Author

**Riddhiman Swanan Debnath**
GitHub: [@Riddhi73](https://github.com/Riddhi73)

## License

This project currently has no license specified. All rights reserved by the author unless stated otherwise.
