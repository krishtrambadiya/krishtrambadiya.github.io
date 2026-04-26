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

## Contact Form Setup (Formspree)

The contact form sends directly to Formspree using `VITE_CONTACT_FORM_ENDPOINT`.

1. Create a form in Formspree and copy your endpoint (`https://formspree.io/f/xxxxx`)
2. Copy `.env.example` to `.env`
3. Set:

```env
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
```

4. Restart the dev server after changing env variables

This setup works on static hosting (GitHub Pages, Vercel static deploys, Netlify).

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
