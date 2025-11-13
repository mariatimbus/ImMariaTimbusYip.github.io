# Maria Timbuș — Pixel BW 3D Portfolio (Full)

Features:
- React + Vite + React Router
- 3D hero (Three.js + R3F + Drei)
- Pixel theme (grid, scanlines, flicker)
- Home sections: Hero, Projects, Skills, About, Contact
- Press page at /press
- Navbar with bigger logo, hash navigation even from /press
- Contact form wired to /api/contact (Node + Nodemailer)
- Résumé download (Maria_Timbus_Resume.pdf)
- GitHub projects open directly

## Setup

```bash
npm install
cp .env.example .env   # fill in SMTP settings
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8787 (proxied as /api)
