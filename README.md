# Portfolio

Personal React portfolio app built with Vite.

## Tech Stack

- React 18
- Vite
- Framer Motion
- Lucide React

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build in `dist/`
- `npm run preview` serves the production build locally

## Contact Form Setup (Vercel + Resend)

This project includes a serverless endpoint at `api/contact.js` for sending emails with Resend.

Frontend behavior:
- Default submit endpoint is `/api/contact`
- You can override it with `VITE_CONTACT_FORM_ENDPOINT` if needed

Required environment variables:

```env
VITE_CONTACT_FORM_ENDPOINT=/api/contact
RESEND_API_KEY=re_XXXXXXXXXXXXXXXX
RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
RESEND_TO_EMAIL=yourname@example.com
```

Deploy steps on Vercel:
1. Import this repo in Vercel
2. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `RESEND_TO_EMAIL` in Project Settings > Environment Variables
3. (Optional) Add `VITE_CONTACT_FORM_ENDPOINT=/api/contact`
4. Deploy

Notes:
- `RESEND_FROM_EMAIL` should be a verified sender in Resend (use your domain for production).
- Keep `RESEND_API_KEY` server-side only; never expose it as a `VITE_` variable.

## Project Structure

```text
portfolio/
  docs/
    images/                  # README/reference screenshots
  public/                    # static files served as-is
  src/
    assets/                  # imported app assets
    components/
      effects/               # cursor and visual interaction helpers
      scene/                 # 3D/hero scene internals
      sections/              # page sections (hero, work, contact, etc.)
    App.jsx
    index.css
    main.jsx
  vite.config.js
```

## Notes

- This repository is standardized on **Vite**.
