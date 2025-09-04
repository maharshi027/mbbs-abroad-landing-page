# Study MBBS Abroad — Landing Page

Responsive landing page built for **University Insights** (Front-End Intern application).  
Deployed easily on Netlify/Vercel. Includes GA4 & Facebook Pixel hooks, SEO tags, and lead form validation.

## Tech Stack
- **HTML5** + **Tailwind CSS (CDN)** for rapid UI
- **Vanilla JavaScript** for interactivity & validation
- Optional **PHP** (`form-handler.php`) demo endpoint for POST handling

## Structure
```
mbbs-landing/
├── index.html
├── main.js
├── form-handler.php        # (optional demo backend)
├── assets/
│   └── favicon.png
└── docs/
    └── brief-report.md     # ~500 words design & dev notes
```

## Run Locally
1. Clone the repo
2. Open `index.html` in a browser (no build step needed).
3. For PHP demo handler: run `php -S localhost:8080` in this folder and open http://localhost:8080

## Deploy
- **Netlify**: drag-and-drop the folder or connect GitHub repo. Set publish directory to `/`.
- **Vercel**: import project, set as static site. No build command needed.

## Analytics
- Replace `G-XXXXXXXXXX` in `index.html` with your GA4 Measurement ID.
- Replace `000000000000000` with your Facebook Pixel ID.

## Notes
- Tailwind via CDN is fine for demo. For production, install Tailwind and purge unused classes for best performance.
- The lead form currently simulates success (`usingDemo = true` in `main.js`). Set it to `false` when connecting to a backend.
