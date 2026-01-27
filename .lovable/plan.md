
# Justice With a Cause - Implementation Plan

## Overview
A mobile-first tenant advocacy platform for AHF/Healthy Housing residents featuring secure incident reporting, community forums, and resources — all with a professional, empowering design.

---

## Phase 1: Foundation & Branding
**Set up the core app structure and design system**

- Configure Lovable Cloud for backend, database, and file storage
- Create the color palette (deep navy, charcoal, white, gold/turquoise accents)
- Set up Inter font and typography scale
- Build reusable UI components (buttons, cards, forms) with law-firm-style polish
- Create responsive mobile-first layout with header and footer
- Add footer disclaimer text as specified

---

## Phase 2: Public Pages
**Build the informational pages**

### Home Page (/)
- Hero section with headline "Your Voice Has Power. Your Home Has Rights."
- Three action buttons: Submit a Concern, Explore Resources, Join the Community
- Brief platform overview section

### About Page (/about)
- Mission statement and platform purpose
- Warm, empowering tone

### Legal Page (/legal)
- Not-a-law-firm disclaimer
- Truthfulness statement
- Privacy policy
- Community acceptable-use rules

---

## Phase 3: Authentication System
**User registration and admin role management**

- Email/password signup and login
- Secure password requirements
- Auto-admin assignment for Kyle.Merritt@cosmicblueprint.space
- Protected routes for authenticated areas
- Role-based access control (user vs admin)

---

## Phase 4: Incident Reporting System
**The core complaint/intake form with file uploads**

### Database Setup
- Create `submissions` table with all required fields
- Create `submission_files` table for evidence attachments
- Set up secure storage bucket (50MB max per file)
- RLS policies: only admin can view submissions

### Submission Form (/submit)
- All fields as specified (name optional, property/unit required, etc.)
- Issue type dropdown with all categories
- Date picker for incident dates
- Rich text area for detailed description
- Multi-file upload supporting images, video, PDF, DOCX, audio
- Required truthfulness checkbox
- Optional follow-up checkbox
- Success confirmation with reference ID

### Email Automation
- Set up Resend integration
- Create edge function to send intake emails
- Email includes: reference ID, property/unit, issue type, dates, description, contact info, attachment download links
- Sends to Kyle.Merritt@cosmicblueprint.space

---

## Phase 5: Resources Library
**Downloadable templates and legal aid links**

### Resources Page (/resources)
- Header: "Know Your Rights. Protect Your Home."
- Template sections with download buttons:
  - Repair Request Letter (DOCX/PDF)
  - Formal Grievance Letter (DOCX/PDF)
  - Cease Harassment Notice (DOCX/PDF)
  - Reasonable Accommodation Request (DOCX/PDF)
- Legal Aid organizations section with placeholder links
- Clean card-based layout

---

## Phase 6: Community Forum
**Discussion platform with moderation**

### Database Setup
- `forum_categories` table (7 categories as specified)
- `forum_posts` table with anonymous posting flag
- `forum_comments` table
- `forum_votes` table for upvotes
- `forum_reports` table for content flagging
- RLS policies for authenticated access

### Forum Features (/community)
- Category listing page
- Post list with upvote counts and comment counts
- Create post form with optional anonymous toggle
- hCaptcha integration for anonymous posts
- Comment threads on posts
- Upvote functionality
- Report content button
- Pinned posts display

### Rate Limiting
- Limit posts per user per hour
- Stricter limits for anonymous posts
- Implemented via edge function

---

## Phase 7: Admin Dashboard
**Kyle's management interface**

### Submissions Management
- View all submissions in sortable/filterable table
- View full submission details with file downloads
- Search by property, date, issue type
- Status tracking (new, reviewed, resolved)

### Forum Moderation
- View reported content queue
- Hide/delete posts and comments
- Pin/unpin posts
- View user activity

### Dashboard Home
- Quick stats: new submissions, pending reports
- Recent activity feed

---

## Phase 8: Polish & Security
**Final refinements**

- Mobile responsiveness testing and fixes
- Form validation with clear error messages
- Loading states and error handling
- Rate limiting on submission form
- Input sanitization
- Accessibility review (ARIA labels, keyboard navigation)
- SEO meta tags

---

## Tech Stack Summary
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with RLS
- **File Storage**: Supabase Storage (50MB limit)
- **Email**: Resend
- **Anti-spam**: hCaptcha + rate limiting
- **Auth**: Supabase Auth with role-based access

---

## Secrets Required
You'll need to provide:
1. **RESEND_API_KEY** - For sending intake emails
2. **HCAPTCHA_SECRET_KEY** - For spam protection on anonymous posts
3. **HCAPTCHA_SITE_KEY** - Public key for captcha widget

